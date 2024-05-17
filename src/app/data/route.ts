import { parse } from "csv-parse/sync";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
    const fileContents: string = await readFile("./data/jeopardy.csv", {encoding: 'utf-8'});

    const loadedData: any[] = parse(fileContents, {
        encoding: 'utf-8'
    });

    const headers: string[] = loadedData[0];
    
    let result: any[] = [];

    loadedData.forEach(entry => {
        let obj: any = {};
        headers.forEach((header: string, index: number) => {
            obj[header] = entry[index];
        });
        result.push(obj);
    });

    return NextResponse.json(result.slice(1));
}