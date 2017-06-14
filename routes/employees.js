var employees = [
    {"id": 0, "firstName": "S", "lastName": "Sadagopan", "reports": 0, "title": "CEO", "department": "Corporate", "cellPhone": "9731023430", "officePhone": "8826309373", "email": "fakemail.com", "city": "Bangalore", "pic": "S_Sadagopan.jpg", "twitterId": "@fakejking", "blog": "dontknowblog"},
    {"id": 1, "firstName": "Suprgya", "lastName": "Bhushan", "managerId": 0, "managerName": "S Sadagopan", "reports": 2, "title": "VP of Marketing", "department": "Marketing", "cellPhone": "9818662494", "officePhone": "9810176463", "email": "fakemail.com", "city": "Bangalore", "pic": "Suprgya_Bhushan.jpg", "twitterId": "@fake", "blog": "ryangosling"}
];

exports.findAll = function (req, res, next) {
    var name = req.query.name;
    if (name) {
        res.send(employees.filter(function(employee) {
            return (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1;
        }));
    } else {
        res.send(employees);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(employees[id]);
};

exports.findReports = function (req, res, next) {
    var id = parseInt(req.params.id),
        response,
        reports = [],
        employee;

    response = {
        id: id,
        firstName: employees[id].firstName,
        lastName: employees[id].lastName,
        title: employees[id].title,
        pic: employees[id].pic
    }

    for (var i=0; i<employees.length; i++) {
        employee = employees[i];
        if (employee.managerId === id) {
            reports.push({id: employee.id, firstName: employee.firstName, lastName: employee.lastName, title: employee.title, pic: employee.pic});
        }
    }

    response.reports = reports;

    res.send(response);
};
