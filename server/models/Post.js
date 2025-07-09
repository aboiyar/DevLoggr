const pool = require('../config/db');

class Post {
  static async create({ title, content, userId, imageUrl = null }) {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, user_id, image_url) VALUES (?, ?, ?, ?)',
      [title, content, userId, imageUrl]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, u.username 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `);
    return rows;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { title, content, imageUrl = null }) {
    await pool.execute(
      'UPDATE posts SET title = ?, content = ?, image_url = ? WHERE id = ?',
      [title, content, imageUrl, id]
    );
  }

  static async delete(id) {
    await pool.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

  static async recordView(postId, userId) {
    // Check if view already exists
    const [existing] = await pool.execute(
      'SELECT * FROM post_views WHERE post_id = ? AND user_id = ?',
      [postId, userId]
    );
    
    if (existing.length === 0) {
      await pool.execute(
        'INSERT INTO post_views (post_id, user_id) VALUES (?, ?)',
        [postId, userId]
      );
    }
  }

  static async getViewedPosts(userId) {
    const [rows] = await pool.execute(`
      SELECT p.* 
      FROM posts p
      JOIN post_views pv ON p.id = pv.post_id
      WHERE pv.user_id = ?
      ORDER BY pv.viewed_at DESC
    `, [userId]);
    return rows;
  }
}

module.exports = Post;
