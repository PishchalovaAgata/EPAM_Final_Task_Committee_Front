Components
----------

**src/components/alert/alert.component.js**

### 1. AlertTemplate




-----
**src/components/filter/components/dropdown.component.js**

### 2. DropDownComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
input|shape|no||
label|string|no|&lt;See the source code&gt;|
items|arrayOf|no|&lt;See the source code&gt;|
defaultItems|arrayOf|no||
-----
**src/components/filter/filter-forms/faculties-filter-form.js**

### 3. FacultiesFilterForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
handleSubmit|func|yes||
onSubmit|func|yes||
subjects|arrayOf|no||
t|func|no||
data||no|&lt;See the source code&gt;|
-----
**src/components/footer/footer.component.js**

### 4. Footer




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
alert|shape|no||
-----
**src/components/header/dropDownTrigger/dropDownTrigger.components.js**

### 5. DropDownTrigger




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|shape|no||
itemSelected|func|no||
i18n|shape|no||
t|func|no||
-----
**src/components/header/header.components.js**

### 6. HeaderComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|shape|no||
itemSelected|func|no||
-----
**src/components/languageDropDown/languageDropDown.component.js**

### 7. LanguageDropDown




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
i18n|shape|no||
t|func|no||
-----
**src/components/loaders/semantic-loader.js**

### 8. SemanticLoader




-----
**src/main/app/App.js**

### 9. App




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
user|shape|no||
alert|shape|no||
-----
**src/main/auth/components/login-input.js**

### 10. LoginInputForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
inputHandle|func|no||
t|func|no||
-----
**src/main/auth/registration/registration-form.component.js**

### 11. RegistrationForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
t|func|no||
i18n|shape|no||
-----
**src/main/auth/registration/registration.component.js**

### 12. RegistrationComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
register|func|no||
alert|shape|no||
auth|shape|no||
-----
**src/main/auth/sign-in/sign-in.component.js**

### 13. SignInComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
login|func|no||
auth|shape|no||
alert|shape|no||
-----
**src/main/cabinet/admin-panel/admin-panel.component.js**

### 14. AdminPanel




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
-----
**src/main/cabinet/cabinet.component.js**

### 15. CabinetPage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
getSubjectsList|func|no||
getEditFormValues|func|no||
user|shape|no||
t|func|no||
subjects|arrayOf|no||
formValues|shape|no||
getEntrantFaculty|func|no||
getEntrantStatus|func|no||
entrantFaculty|shape|no||
entrantStatus|string|no||
alert|shape|no||
-----
**src/main/cabinet/subjects/subjects-form.component.js**

### 16. EditSubjectsForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
t|func|no||
subjects|arrayOf|no||
-----
**src/main/cabinet/subjects/subjects.component.js**

### 17. SubjectsComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
subjects|arrayOf|no||
editSubjects|func|no||
getSubjectsList|func|no||
t|func|no||
alert|shape|no||
-----
**src/main/entrant/edit/edit-entrant.component.js**

### 18. EditEntrantForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
t|func|no||
subjects|arrayOf|no||
i18n|shape|no||
formValues|shape|no||
role|string|no||
isFull|bool|no||
-----
**src/main/faculty/add/add-faculty-form.component.js**

### 19. AddFacultyForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
t|func|no||
subjects|arrayOf|no||
i18n|shape|no||
-----
**src/main/faculty/add/add-faculty.component.js**

### 20. AddFaculty




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
getSubjectsList|func|no||
getEditFormValues|func|no||
subjects|arrayOf|no||
match|shape|no||
t|func|no||
alert|shape|no||
-----
**src/main/faculty/edit/edit-faculty-form.component.js**

### 21. EditFacultyForm




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
t|func|no||
subjects|arrayOf|no||
i18n|shape|no||
formValues|shape|no||
-----
**src/main/faculty/edit/edit-faculty.component.js**

### 22. EditFaculty




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onSubmit|func|no||
getSubjectsList|func|no||
getEditFormValues|func|no||
subjects|arrayOf|no||
formValues|shape|no||
match|shape|no||
t|func|no||
alert|shape|no||
-----
**src/main/faculty/faculty-table.component.js**

### 23. FacultyTable




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
role|string|no||
id|number|no||
t|func|no||
alert|shape|no||
getFaculties|func|no||
totalPages|number|no||
faculties|arrayOf|no||
-----
**src/main/faculty/faculty.component.js**

### 24. Faculty




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
faculty|shape|no||
role|string|no||
onEditPageClick|func|no||
onDeleteElementClick|func|no||
-----
**src/main/faculty/filter/candidates-filter.container.js**

### 25. FilterComponent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
alert|shape|no||
onSubmit|func|no||
getSubjectsList|func|no||
subjects|arrayOf|no||
onFilter|func|no||
-----
**src/main/sheet/sheet-row.component.js**

### 26. SheetRow




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
entrant|shape|no||
-----
**src/main/sheet/sheet-table.component.js**

### 27. FacultyTable




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
t|func|no||
alert|shape|no||
entrants|arrayOf|no||
match|shape|no||
sheetGetEntrants|func|no||
facultyName|string|no||
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
