import { parse } from "csv-parse/sync";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { JeopardyQuestion } from "../jeopardy";

export async function GET() {
    const fileContents: string = await readFile("./jeopardy.csv", {encoding: 'utf-8'});

    const loadedData: any[] = parse(fileContents, {
        encoding: 'utf-8'
    });

    const headers: string[] = loadedData[0];
    
    let result: JeopardyQuestion[] = [];

    loadedData.forEach(entry => {
        let obj: any = {};
        headers.forEach((header: string, index: number) => {
            obj[header] = entry[index];
        });
        result.push(obj);
    });

    return NextResponse.json(result.slice(1));
}