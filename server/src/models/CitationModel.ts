import { RowDataPacket } from "mysql2";
import db from "../config/db";
import moment from "moment";

class Citation {
  citation: string;

  constructor(citation: string) {
    this.citation = citation;
  }

  save() {
    const createdAtDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const escapedCitation = this.citation.replace(/'/g, "''");
    const sql = `
    INSERT INTO citation(
        citation,
        created_at
    )
    VALUES(
      '${escapedCitation}',      
      '${createdAtDate}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    const sql = "SELECT * FROM citation ORDER BY created_at DESC;";

    return db.execute(sql);
  }

  static findById(id: number) {
    const sql = `SELECT * FROM citation WHERE id = ${id};`;

    return db.execute(sql);
  }
  static async findOne(citation: string) {
    const sql = `SELECT COUNT(*) AS count FROM citation WHERE citation = ?;`;
    const [result] = await db.execute<RowDataPacket[]>(sql, [citation]);
    const count = result[0].count;
    return count > 0;
  }
  static deleteOne(id: number) {
    const sql = `DELETE FROM citation WHERE id = ${id};`;

    return db.execute(sql);
  }
  static findRandom() {
    const sql = "SELECT * FROM citation ORDER BY RAND() LIMIT 1;";

    return db.execute(sql);
  }

  static updateOne(id: number, citation: string) {
    const sql = "UPDATE citation SET citation = ?, created_at = ? WHERE id = ?";
    const now = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    return db.execute(sql, [citation, now, id]);
  }
}

export default Citation;
