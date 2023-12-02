export default function getToday():string {
    const today = new Date();    
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate:string = `${year}${month}${day}`;
    return formattedDate;
}
