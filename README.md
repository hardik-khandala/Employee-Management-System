# Employee-Management-System
An Angular-based Employee Management System that allows users to manage employee data and assigned projects efficiently. The system is equipped with features such as filtering, validation, nested routing, and project assignment, offering a seamless user experience for employee and project management.

## Features

### Employee List (`/employees`)
- View, add, edit, and delete employees.
- Filter by **Status** (Active, Inactive) and **Position** (Developer, Manager).
- Search by **Name** or **Email**.
- Sort by **Joining Date** (most recent first).
- Pagination for large datasets.
- Confirmation dialog for deletions.

### Employee Details (`/employees/:id`)
- View employee details with nested tabs:
  - **Personal Info**: Displays name, email, phone number, and position.
  - **Assigned Projects**: View or modify assigned projects.
- Disable "Assigned Projects" tab if no projects are assigned.

### Add/Edit Employee
- Add a new employee (`/employees/new`) or edit existing details (`/employees/:id/edit`).
- Field validation for unique **email**, **phone**, and valid **position**.
- Redirect to the employee details page upon successful submission.

### Assign Projects (`/employees/:id/projects/assign`)
- Assign active projects to employees without duplication.
- Filter projects by status (e.g., Active, Completed).

## Business Logic Highlights
- **Filtering**: Filter employees by status or position.
- **Validation**: Ensure data integrity for email, phone, and position.
- **Dynamic Tabs**: Disable "Assigned Projects" tab when no projects are assigned.
- **Deletion Rules**: Only allow deletion of active employees not tied to projects.
- **Redirection**: Redirect to details page after adding or editing employees.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hardik-khandala/Employee-Management-System.git
   cd Employee-Management-System
   npm install
   npm start
   ```


