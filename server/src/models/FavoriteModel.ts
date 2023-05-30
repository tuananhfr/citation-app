import db from "../config/db";
import moment from "moment";
import { RowDataPacket } from "mysql2";

class Favorite {
  citation: string;
  personnage: string;
  episode: string;

  constructor(citation: string, personnage: string, episode: string) {
    this.citation = citation;
    this.personnage = personnage;
    this.episode = episode;
  }

  save() {
    const createdAtDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    const escapedCitation = this.citation.replace(/'/g, "''");
    const escapedPersonnage = this.personnage.replace(/'/g, "''");
    const escapedEpisode = this.episode.replace(/'/g, "''");

    const sql = `
    INSERT INTO favorite(
        citation,
        personnage,
        episode,
        created_at
    )
    VALUES(
      '${escapedCitation}', 
      '${escapedPersonnage}',      
      '${escapedEpisode}',      

      '${createdAtDate}'
    )
    `;

    return db.execute(sql);
  }

  static findAll() {
    const sql = "SELECT * FROM favorite;";

    return db.execute(sql);
  }

  static async findOne(citation: string, personnage: string, episode: string) {
    const sql = `SELECT * FROM favorite WHERE citation = ? AND personnage = ? AND episode = ?;`;
    const [result] = await db.execute<RowDataPacket[]>(sql, [
      citation,
      personnage,
      episode,
    ]);
    const count = result[0];
    return count;
  }

  static deleteOne(id: number) {
    const sql = `DELETE FROM favorite WHERE id = ${id};`;

    return db.execute(sql);
  }
  static findById(id: number) {
    const sql = `SELECT * FROM favorite WHERE id = ${id};`;

    return db.execute(sql);
  }
  static findAllFavorite() {
    const sql = "SELECT * FROM favorite ORDER BY created_at DESC;";

    return db.execute(sql);
  }
}

export default Favorite;
