import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function createDepartment(id, departmentName, location){
    const newDepartment = await client.department.create({
        data: {
            id,
            departmentName,
            location
        }
    });
    console.log(newDepartment);
}
// createDepartment("DPT001", "Computer Science", "Nairobi Campus");
// createDepartment("DPT002", "Information Technology", "Mombasa Campus");
// createDepartment("DPT003", "Software Engineering", "Kisumu Campus");
// createDepartment("DPT004", "Cyber Security", "Eldoret Campus");
// createDepartment("DPT005", "Business Studies", "Nakuru Campus");
// createDepartment("DPT006", "Business and Finance", "Kisii Campus");

async function getDepartments(){
    const departments = await client.department.findMany({
        include: {
            employees: true
        }
    });
    console.log(departments)
}

// getDepartments()

/**
 * Get department
Write a function named getDepartment that retrieves a single department from the database based on its ID.

The function should take one parameter, the department ID, and use Prisma;s findUnique() method to fetch the matching department record.

If the department is found, log it to the console, if it is not found, log the message "Department not found".
 */

async function getDepartment(id){
    const department = await client.department.findUnique({
        where: {id}
    })

    if (department){
        console.log(department);
    }else{
        console.log('Department not found!')
    }
    
}

// getDepartment('DPT001');

/**
 * 6. Delete department
Write a function called deleteDepartment that deletes the "Business and Finance" department with department ID "DPT006".
 */

async function deleteDepartment(){
    const deletedDepartment = await client.department.delete({
        where: {
            id: "DPTOO6",
        }
    });
    console.log(deletedDepartment);
}

// deleteDepartment();

/**
 * 7. Update department
Write a function named updateDepartment that updates the location of the Cyber Security department (DPT004) to "Kericho Campus".

The function should use Prisma's update() method to find the department by its ID (DPT004) and modify the location field.
 */

async function updateDepartment(){
    const updatedDepartment = await client.department.update({
        where: {
            id: 'DPT004'
        },
        data: {
            location: "Kericho Campus"
        }
    });
    console.log(updatedDepartment)
} 

// updateDepartment()

/**
 * 8. Insert Employees
Write a function named createEmployee that adds a new employee record to the database.

id: a string that uniquely identifies an employee
firstName: The employee's first name.
lastName: The employee's last name..
email: The employee's email address.
salary: The employee's salary amount.
departmentId: The ID of the department the employee belongs to. The function should use Prisma's create method to insert a new employee record into the database.
 */

async function createEmployee(id, firstName, lastName, email, salary, departmentId){
    const employee = await client.employee.create({
        data: {
            id,
            firstName,
            lastName,
            email,
            salary,
            departmentId
        }
    });
    console.log(employee);
}

// createEmployee("EMP001", "John", "Mwangi", "john.mwangi@company.com", 65000.00, "DPT001");
// createEmployee("EMP002", "Alice", "Otieno", "alice.otieno@company.com", 92000.00, "DPT002");
// createEmployee("EMP003", "Brian", "Kariuki", "brian.kariuki@company.com", 88000.00, "DPT003");
// createEmployee("EMP004", "Grace", "Mutua", "grace.mutua@company.com", 97000.00, "DPT004");
// createEmployee("EMP005", "Kevin", "Omondi", "kevin.omondi@company.com", 66000.00, "DPT005");
// createEmployee("EMP006", "Linda", "Njeri", "linda.njeri@company.com", 91000.00, "DPT001");
// createEmployee("EMP007", "Samuel", "Kiptoo", "samuel.kiptoo@company.com", 63000.00, "DPT002");
// createEmployee("EMP008", "Mary", "Wanjiku", "mary.wanjiku@company.com", 89000.00, "DPT003");
// createEmployee("EMP009", "Peter", "Kamau", "peter.kamau@company.com", 95000.00, "DPT004");
// createEmployee("EMP010", "Faith", "Achieng", "faith.achieng@company.com", 78000.00, "DPT005");
// createEmployee("EMP011", "Ann", "Chebet", "ann.chebet@company.com", 78000.00, "DPT003");

/**
 * 9. Get all Employees
Write a function named getEmployees that retrieves all employees from the database, including their department details.

Your function should use Prisma's findMany() method with the include option to fetch each employee along with their related department information.
 */

async function getEmployees(){
    const employees = await client.employee.findMany({
        include: {
            department: true,
        }
    });
    console.log(employees);
}
// getEmployees();


/**
 * 10. Retrieve Employees by Salary Range
Write a function named getBySalaryRange that retrieves all employees whose salaries fall within a specified range.

The function accepts two parameters:

min: minimum salary value.
max: maximum salary value.
Before performing the query, add a validation check:

if min is greater than max, throw an error "Minimum cannot be greater than maximum"
If the values are valid, use Prisma's findMany() method to fetch all employees whose salary is between the given min and max values.
 */
async function getBySalaryRange(min, max){
    if (min > max){
            throw new Error("Minimum cannot be greater than maximum!");
        }
    const salaryRange = await client.employee.findMany({
        where: {
            salary: {
                gte: min,
                lte: max
            }
        }
    });
    console.log(salaryRange);
}

// getBySalaryRange(60000, 70000);

/**
 * 11. Delete Employee
Write a function deleteEmployee that deletes the employee with id EMP011.
 */
async function deleteEmployee(){
    const deletedEmployee = await client.employee.delete({
        where: {
            id: 'EMP011'
        }
    });
    console.log(deletedEmployee);
}

// deleteEmployee();

/**
 * 12. Update Employee
Write a function called updateEmployee that updates the `salary of employee with id "EMP010" to 90000 respectively.
 */

async function updateEmployee(){
    const updatedEmployee = await client.employee.update({
        where: {
            id: "EMP010",
        },
        data: {
            salary: 90000
        }
    });
    console.log(updatedEmployee);
}

// updateEmployee();