import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ambil token dari header atau body
  const token = req.headers.authorization?.replace('Bearer ', '') || req.body?.auth_token;

  // Simulasi token kadaluarsa
  if (!token) {
    return res.status(401).json({ valid: false, reason: 'No token provided' });
  }

  // Contoh: token 'expiredtoken' dianggap kadaluarsa
  if (token === 'expiredtoken') {
    return res.status(401).json({ valid: false, reason: 'Token expired' });
  }

  // Token lain dianggap valid
  return res.status(200).json({ valid: true });
} 