declare class returnData {
    "html": string;
    "css": string;
    "js": string;
}
export function getAll(file: string, callback: (data: returnData | null, error: boolean | string) => void): void;
export function getHTML(file: string, callback: (data: string | null, error: boolean | string) => void): void;
export function getCSS(file: string, callback: (data: string | null, error: boolean | string) => void): void;
export function getJS(file: string, callback: (data: string | null, error: boolean | string) => void): void;
export function validate(file: string, callback: (error: boolean, message: string) => void): void;