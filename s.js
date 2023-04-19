class student{
    constructor(reason,place){
        this.reason = reason
        this.place = place
    }
}
let studentObjs = []
fetch('studentDataForm.xlsx')
.then(response => response.arrayBuffer())
.then(data => {
  // Parse the Excel file data into a workbook object
  const workbook = XLSX.read(data, { type: 'array' });
  // Get the name of the first sheet
  const sheetName = workbook.SheetNames[0];
  // Get the worksheet object
  const worksheet = workbook.Sheets[sheetName];
  // Convert the worksheet object to an array of objects
  data = XLSX.utils.sheet_to_json(worksheet);
  data.forEach(row=>{
    let a = new student(row['Why did you join this college?'],row['Why did you join this college?'])
    studentObjs.push(a)
  })
})
.catch(error => console.error(error));
console.log(studentObjs)