

const apiKey: string = process.env.REACT_APP_RAPID_API_KEY || "";
const hostKey: string = process.env.REACT_APP_RAPID_API_HOST || "";
const dbUrl = process.env.REACT_APP_API_URL || "";

if (!dbUrl) {
    console.error("REACT_APP_DB_URL environment variable not set.")
}
