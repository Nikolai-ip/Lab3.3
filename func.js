let students;

function openXML() {
    let y;
    let xmlContent = '';
    let i, exist;
    fetch('students.xml').then((response) => {
        response.text().then((xml) => {
            xmlContent = xml;

            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
            students = xmlDOM.querySelectorAll('student');
            students.forEach(studentXmlNode => {

                y = document.createElement("option");
                y.value = studentXmlNode.children[0].innerHTML;
                y.text = studentXmlNode.children[0].innerHTML;
                document.getElementById("input_name").add(y);

                y = document.getElementById("input_group");
                for (i = 1; i < y.length; i++) {
                    if (y.options[i].value == studentXmlNode.children[3].innerHTML) {
                        exist = 1;
                        break;
                    }
                }
                if (!exist) {
                    y = document.createElement("option");
                    y.value = studentXmlNode.children[3].innerHTML;
                    y.text = studentXmlNode.children[3].innerHTML;
                    document.getElementById("input_group").add(y);
                }
                exist = 0;
            });

        });
    });
}

function changeFacAndCrs() {
    let y;
    let i;
    let text;

    y = document.getElementById("input_group");
    text = y.options[y.selectedIndex].text;

    for (i = 1; i < 8; i++) {
        y = document.getElementsByName("radio_" + i.toString());
        y[0].checked = false;
        y[1].checked = false;
        y[2].checked = false;
    }

    y = document.getElementById("input_name");
    y.value = "";

    if (text == "\u00A0") {
        y = document.getElementById("input_faculty");
        y.value = "";
        y = document.getElementById("input_course");
        y.value = "";
        return;
    }

    for (i = 0; i < students.length; i++) {
        if (students[i].children[3].innerHTML == text) break;
    }

    y = document.getElementById("input_faculty");
    y.value = students[i].children[1].innerHTML;

    y = document.getElementById("input_course");
    y.value = students[i].children[2].innerHTML;
}

function changeAll() {
    let y;
    let text;
    let studentNumber;
    let i;

    y = document.getElementById("input_name");
    text = y.options[y.selectedIndex].text;

    if (text == "\u00A0") {
        for (i = 1; i < 8; i++) {
            y = document.getElementsByName("radio_" + i.toString());
            y[0].checked = false;
            y[1].checked = false;
            y[2].checked = false;
        }
        return;
    }

    for (studentNumber = 0; studentNumber < students.length; studentNumber++) {
        if (students[studentNumber].children[0].innerHTML == text) break;
    }

    y = document.getElementById("input_faculty");
    y.value = students[studentNumber].children[1].innerHTML;

    y = document.getElementById("input_course");
    y.value = students[studentNumber].children[2].innerHTML;

    y = document.getElementById("input_group");
    y.value = students[studentNumber].children[3].innerHTML;

    for (i = 1; i < 8; i++) {
        y = document.getElementsByName("radio_" + i.toString());
        if (students[studentNumber].children[i + 3].getAttribute("score") == "0")
            y[0].checked = true;
        if (students[studentNumber].children[i + 3].getAttribute("score") == "1")
            y[1].checked = true;
        if (students[studentNumber].children[i + 3].getAttribute("score") == "2")
            y[2].checked = true;
    }
}

function countPoints() {
    let y;
    let sum = 0;
    let i;
    for (i = 1; i < 8; i++) {
        y = document.getElementsByName("radio_" + i.toString());
        if (y[1].checked == true) sum += 1;
        if (y[2].checked == true) sum += 2;
    }
    sum /= 7;
    y = document.getElementById("point");
    y.innerHTML = sum.toString();
}

function deletePoints() {
    document.getElementById("point").innerHTML = "";
}