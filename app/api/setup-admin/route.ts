import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const adminEmail = process.env.ADMIN_USERNAME || 'admin@apnajhola.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json({ success: false, message: 'Missing Supabase environment variables' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: adminEmail,
            password: adminPassword,
        });

        if (error) {
            return NextResponse.json({ success: false, message: error.message });
        }

        return NextResponse.json({
            success: true,
            message: 'Admin user signup initiated. Please check your email for confirmation if email confirmation is enabled.',
            user: data.user
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
