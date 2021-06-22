export default function getTimeDiff(start: number, end: number): string {
    let timeDiffSeconds = end - start;
    let hours = Math.round( timeDiffSeconds / 60 ) / 60;
    let days = Math.round( hours / 24 );
    if ( hours > 24 ) {
        return `${ days } days ago`;
    }
    return `${ hours } hours ago`;
}