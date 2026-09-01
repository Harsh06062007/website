let attendanceData =
    JSON.parse(localStorage.getItem("neonAttendance")) || [];


function addStudent() {

    const name = document.getElementById("studentName").value.trim();
    const date = document.getElementById("attendanceDate").value;

    if (name === "") {
        alert("Please enter student name");
        return;
    }

    if (date === "") {
        alert("Please select date");
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        date: date,
        status: "Not Marked"
    };

    attendanceData.push(student);

    saveData();

    document.getElementById("studentName").value = "";
    document.getElementById("attendanceDate").value = "";

    displayAttendance();
}


function markPresent(id) {

    const student = attendanceData.find(
        student => student.id === id
    );

    if (student) {
        student.status = "Present";
    }

    saveData();
    displayAttendance();
}


function markAbsent(id) {

    const student = attendanceData.find(
        student => student.id === id
    );

    if (student) {
        student.status = "Absent";
    }

    saveData();
    displayAttendance();
}


function deleteStudent(id) {

    attendanceData = attendanceData.filter(
        student => student.id !== id
    );

    saveData();
    displayAttendance();
}


function getPercentage(studentName) {

    const records = attendanceData.filter(
        student => student.name.toLowerCase() ===
                   studentName.toLowerCase()
    );

    const total = records.filter(
        student => student.status !== "Not Marked"
    ).length;

    const present = records.filter(
        student => student.status === "Present"
    ).length;

    if (total === 0) {
        return "0%";
    }

    return Math.round((present / total) * 100) + "%";
}


function displayAttendance() {

    const list = document.getElementById("attendanceList");

    list.innerHTML = "";

    attendanceData.forEach(student => {

        let statusClass = "";

        if (student.status === "Present") {
            statusClass = "present";
        }

        if (student.status === "Absent") {
            statusClass = "absent";
        }

        const percentage = getPercentage(student.name);

        list.innerHTML += `

            <tr>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.date}
                </td>

                <td class="${statusClass}">
                    ${student.status}
                </td>

                <td>
                    <button
                        class="present-btn"
                        onclick="markPresent(${student.id})">
                        Present
                    </button>
                </td>

                <td>
                    <button
                        class="absent-btn"
                        onclick="markAbsent(${student.id})">
                        Absent
                    </button>
                </td>

                <td class="percentage">
                    ${percentage}
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>

            </tr>

        `;
    });
}


function saveData() {

    localStorage.setItem(
        "neonAttendance",
        JSON.stringify(attendanceData)
    );
}


displayAttendance();
