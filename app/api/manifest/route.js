import { NextResponse } from 'next/server'
import {getAppData} from '@/requests/appData'

export async function GET(req, res)  {
    
    const appId = req.nextUrl.searchParams.get("appId") || "1234"
    const appData = await getAppData(appId)
    return NextResponse.json(appData)
}