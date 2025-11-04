import jwt from 'jsonwebtoken';

export default async function authMiddleware(request, response, next){
    const token = request.cookies.token;

    if (!token) return response.status(401).json({ ok : false, data : 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.userId = decoded.id;
        next();
      } catch (err) {
        response.status(403).json({ok : false, data: 'Invalid or expired token' });
      }
}