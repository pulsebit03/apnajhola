import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Simple validation
        if (!body.name || !body.price || !body.category) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    name: body.name,
                    price: parseFloat(body.price),
                    category: body.category,
                    image_url: body.image || null,
                    description: body.description || '',
                }
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, product: data });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
