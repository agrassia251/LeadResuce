import { Database } from "bun:sqlite";
import bcrypt from "bcryptjs";

const DB_PATH = process.env.DB_PATH || "/home/team/shared/data/leadrescue.db";

async function seed() {
  const sqlite = new Database(DB_PATH);
  sqlite.exec("PRAGMA foreign_keys = ON");

  // Check if demo company already exists
  const existing = sqlite
    .query("SELECT id FROM companies WHERE name = ?")
    .get("EverCool Heating & Air");

  if (existing) {
    console.log("Demo company already seeded, skipping.");
    sqlite.close();
    return;
  }

  const now = new Date().toISOString();
  const passwordHash = await bcrypt.hash("password123", 10);

  // Create demo company
  const companyResult = sqlite.run(
    `INSERT INTO companies (name, industry, employee_count, primary_contact_name, phone, email, typical_lead_value, timezone, business_hours, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "EverCool Heating & Air",
      "HVAC",
      8,
      "Mike Reynolds",
      "(555) 234-5678",
      "mike@evercoolhvac.com",
      2500,
      "America/Chicago",
      "Mon-Fri 7am-6pm, Sat 8am-2pm",
      now,
      now,
    ],
  );

  const companyId = Number(companyResult.lastInsertRowid);

  // Create demo owner user
  const verificationToken = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex");

  sqlite.run(
    `INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified, verification_token, company_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "owner@evercool.com",
      passwordHash,
      "Mike",
      "Reynolds",
      "owner",
      1, // email verified
      null,
      companyId,
      now,
      now,
    ],
  );

  // Create default pipeline stages
  const stages = [
    "New Lead",
    "Attempted Contact",
    "Contacted",
    "Appointment Scheduled",
    "Estimate Sent",
    "Follow-Up Due",
    "Won",
    "Lost",
  ];

  for (let i = 0; i < stages.length; i++) {
    sqlite.run(
      `INSERT INTO pipeline_stages (company_id, name, sort_order, created_at) VALUES (?, ?, ?, ?)`,
      [companyId, stages[i], i, now],
    );
  }

  console.log("Seed complete: EverCool Heating & Air demo account created");
  console.log("  Login: owner@evercool.com / password123");
  console.log("  Company ID:", companyId);

  sqlite.close();
}

seed().catch(console.error);
