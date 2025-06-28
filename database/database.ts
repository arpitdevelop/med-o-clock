import * as SQLite from "expo-sqlite";
import { formatTime } from "../utils/dateFormat";
import { Medicine, Reminder } from "@/constants/types";
import moment from "moment";

interface InputMedicineData {
  name: string;
  type: string;
  dose: string;
  when: string;
  startDate: Date;
  endDate: Date;
  comment: string;
  reminders: {
    id: number;
    time: Date;
  }[];
}

let db: SQLite.SQLiteDatabase | null = null;

// initialize database
export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync("medicinesDB");
  await createTables(db);
  return db;
};

// create tables
const createTables = async (db: SQLite.SQLiteDatabase) => {
  // Medicines table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      dose TEXT NOT NULL,
      _when TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      comment TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
  `);

  // Separate reminders table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medicine_id INTEGER NOT NULL,
      time TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (medicine_id) REFERENCES medicines (id) ON DELETE CASCADE
    );
  `);

  // await db.execAsync(`
  //   CREATE TABLE IF NOT EXISTS medicine_logs (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     medicine_id INTEGER,
  //     scheduled_time DATETIME,
  //     taken_time DATETIME,
  //     status TEXT DEFAULT 'pending', -- pending, taken, missed, skipped
  //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  //     FOREIGN KEY (medicine_id) REFERENCES medicines (id)
  //   );
  // `);
};

export const getMedicines = async (
  db: SQLite.SQLiteDatabase
): Promise<Medicine[]> => {
  // Get all medicines
  const medicines: Omit<Medicine, "reminders">[] = await db.getAllAsync(
    "SELECT * FROM medicines WHERE is_active = 1 ORDER BY name"
  );
  // Get reminders for each medicine
  const medicinesWithReminders: Medicine[] = [];

  for (const medicine of medicines) {
    const reminders: Reminder[] = await getRemindersByMedicineId(
      db,
      medicine.id
    );
    medicinesWithReminders.push({
      ...medicine,
      // times: reminders.map(reminder => reminder.time), // Convert back to times array for compatibility
      reminders, // Also include full reminder objects if needed
    });
  }
  return medicinesWithReminders;
};

export const getRemindersByMedicineId = async (
  db: SQLite.SQLiteDatabase,
  medicineId: number
): Promise<Reminder[]> => {
  return await db.getAllAsync(
    "SELECT * FROM reminders WHERE medicine_id = ? AND is_active = 1 ORDER BY time",
    medicineId
  );
};

// CRUD
export const addMedicine = async (
  db: SQLite.SQLiteDatabase,
  medicine: InputMedicineData
) => {
  console.log(medicine);
  const startDate = moment(medicine.startDate).format("YYYY-MM-DD");
  const endDate = moment(medicine.endDate).format("YYYY-MM-DD");

  const result = await db.runAsync(
    `INSERT INTO medicines (name, type, dose, _when, start_date, end_date, comment)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    medicine.name,
    medicine.type,
    medicine.dose,
    medicine.when,
    startDate,
    endDate,
    medicine.comment
  );
  const medicineId = result.lastInsertRowId;
  console.log(result.lastInsertRowId, result.changes);

  // Add reminders for this medicine
  if (medicine.reminders && medicine.reminders.length > 0) {
    await addRemindersForMedicine(db, medicineId, medicine.reminders);
  }

  return medicineId;
};

// Reminder operations
export const addRemindersForMedicine = async (
  db: SQLite.SQLiteDatabase,
  medicineId: number,
  reminders: InputMedicineData["reminders"]
) => {
  for (const reminder of reminders) {
    const result = await db.runAsync(
      "INSERT INTO reminders (medicine_id, time) VALUES (?, ?)",
      medicineId,
      formatTime(reminder.time)
    );
    console.log(result.lastInsertRowId, result.changes);
  }
};
