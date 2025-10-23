import jwt from 'jsonwebtoken';

export async function authMiddleware(request, response, next){
    const authHeader = request.headers.authorization;

    if (!authHeader) return response.status(401).json({ ok : false, data : 'No token provided' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.userId = decoded.id;
        next();
      } catch (err) {
        response.status(403).json({ok : false, data: 'Invalid or expired token' });
      }
}