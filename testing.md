/*
NEXT.js App Router Authentication & Authorization (OAuth, JWT, Multi-Tenancy) in TypeScript
*/

// 📂 Directory Structure:
// nextjs-app/
// │── app/
// │   ├── layout.tsx
// │   ├── page.tsx
// │   ├── dashboard/page.tsx // Protected Dashboard (SSR Auth)
// │   ├── auth/login/page.tsx // Login Page (OAuth)
// │   ├── auth/logout/page.tsx // Logout
// │   ├── api/auth/route.ts // API for OAuth + JWT auth
// │   ├── api/users/route.ts // Protected API for users
// │
// │── models/
// │   ├── User.ts
// │   ├── Role.ts
// │   ├── Tenant.ts
// │
// │── controllers/
// │   ├── AuthController.ts
// │   ├── UserController.ts
// │
// │── services/
// │   ├── AuthService.ts
// │   ├── UserService.ts
// │
// │── middleware/
// │   ├── authMiddleware.ts // JWT/Session Authentication Middleware
// │   ├── roleMiddleware.ts // Role-Based Access Control
// │   ├── tenantMiddleware.ts // Multi-Tenancy Middleware
// │
// │── lib/
// │   ├── db.ts
// │   ├── jwt.ts
// │   ├── auth.ts
// │
// │── config/
// │   ├── oauth.ts
// │   ├── permissions.ts
// │
// │── hooks/
// │   ├── useAuth.ts

// User Model (models/User.ts)
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    oauthProvider?: string;
    oauthId?: string;
    role: 'admin' | 'manager' | 'user';
    team?: string;
    country?: string;
    region?: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    oauthProvider: { type: String },
    oauthId: { type: String },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    team: { type: String },
    country: { type: String },
    region: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// JWT Utility (lib/jwt.ts)
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};

// OAuth Configuration (config/oauth.ts)
export const OAUTH_PROVIDERS = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        redirectUri: process.env.GOOGLE_REDIRECT_URI!,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        redirectUri: process.env.GITHUB_REDIRECT_URI!,
    },
};

// Authentication Service (services/AuthService.ts)
import User from '../models/User';
import { generateToken } from '../lib/jwt';

class AuthService {
    async authenticateOAuth(provider: string, oauthData: any) {
        let user = await User.findOne({ oauthId: oauthData.id, oauthProvider: provider });
        
        if (!user) {
            user = await User.create({
                name: oauthData.name,
                email: oauthData.email,
                oauthProvider: provider,
                oauthId: oauthData.id,
            });
        }
        
        const token = generateToken({ userId: user._id, role: user.role });
        return { user, token };
    }
}

export default new AuthService();

// Authentication Middleware (middleware/authMiddleware.ts)
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../lib/jwt';

export function authMiddleware(req: NextRequest) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    try {
        const user = verifyToken(token);
        req.user = user;
    } catch (error) {
        return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
    }
}

// Role-Based Middleware (middleware/roleMiddleware.ts)
export function roleMiddleware(allowedRoles: string[]) {
    return (req: NextRequest) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
    };
}

// Multi-Tenancy Middleware (middleware/tenantMiddleware.ts)
export function tenantMiddleware(req: NextRequest) {
    const user = req.user;

    if (req.nextUrl.searchParams.get('team') && user.team !== req.nextUrl.searchParams.get('team')) {
        return NextResponse.json({ message: 'Access restricted to your team' }, { status: 403 });
    }
}

// Protected API Route (app/api/users/route.ts)
import { NextResponse } from 'next/server';
import User from '../../../models/User';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { roleMiddleware } from '../../../middleware/roleMiddleware';
import { tenantMiddleware } from '../../../middleware/tenantMiddleware';

export async function GET(req: NextRequest) {
    authMiddleware(req);
    roleMiddleware(['admin', 'manager'])(req);
    tenantMiddleware(req);
    
    const users = await User.find();
    return NextResponse.json(users);
}

// 🔥 More implementations will be added for complete authentication, authorization, and full features! 🚀
