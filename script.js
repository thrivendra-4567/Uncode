// PAGE NAVIGATION
const pageMap = {
    home: "homePage",
    courses: "coursesPage",
    projects: "projectsPage",
    workshops: "workshopsPage",
    practice: "practicePage",
    community: "communityPage",
    lessons: "lessonPage",
    login: "loginPage"
};

const navLinks = document.querySelectorAll(".nav-link");
const pageViews = document.querySelectorAll(".page-view");
const searchInput = document.getElementById("globalSearch");

function showPage(name) {
    const el = document.getElementById(pageMap[name]);
    if (!el) return;

    pageViews.forEach(page => page.classList.remove("active"));
    el.classList.add("active");

    navLinks.forEach(link => {
        link.classList.toggle("active", link.dataset.page === name);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => showPage(link.dataset.page));
});

document.querySelector(".logo")?.addEventListener("click", e => {
    e.preventDefault();
    showPage("home");
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.go));
});


// FILTER SYSTEM
function filters(buttonSel, cardSel, buttonKey, cardKey) {
    const buttons = document.querySelectorAll(buttonSel);
    const cards = document.querySelectorAll(cardSel);

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            cards.forEach(card => {
                const shouldHide =
                    button.dataset[buttonKey] !== "all" &&
                    card.dataset[cardKey] !== button.dataset[buttonKey];

                card.classList.toggle("hidden", shouldHide);
            });
        });
    });
}

filters(".filter", ".course-card", "filter", "status");

filters(
    "[data-project-filter]",
    ".project-card",
    "projectFilter",
    "category"
);

filters(
    "[data-workshop-filter]",
    ".workshop-card",
    "workshopFilter",
    "workshop"
);


// GLOBAL SEARCH
searchInput?.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let firstPage = null;

    const groups = [
        { page: "courses", selector: ".course-card" },
        { page: "projects", selector: ".project-card" },
        { page: "workshops", selector: ".workshop-card" }
    ];

    groups.forEach(group => {
        document.querySelectorAll(group.selector).forEach(card => {
            const matches = card.textContent.toLowerCase().includes(query);

            card.classList.toggle("hidden", !matches);

            if (matches && query && !firstPage) {
                firstPage = group.page;
            }
        });
    });

    if (firstPage) {
        showPage(firstPage);
    }
});

document.addEventListener("keydown", event => {
    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {
        event.preventDefault();
        searchInput?.focus();
    }

    if (event.key === "Escape" && searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
        searchInput.blur();
    }
});


// COURSE LESSONS
const syllabi = {

    html: [
        "HTML & CSS Foundations",
        [
            [
                "Introduction to the Web",
                "Websites use HTML for structure and CSS for visual design.",
                "HTML describes content; CSS controls its presentation.",
                "<h1>Hello, world!</h1>"
            ],
            [
                "HTML Document Structure",
                "Create the standard structure of an HTML page.",
                "The doctype, html, head and body elements form a basic document.",
                `<!DOCTYPE html>
<html>
<head><title>My Page</title></head>
<body><h1>Welcome</h1></body>
</html>`
            ],
            [
                "Text, Headings and Paragraphs",
                "Organise content with headings and paragraphs.",
                "Use h1–h6 for headings and p for paragraphs.",
                `<h1>My Journal</h1>
<h2>Day One</h2>
<p>I started learning HTML.</p>`
            ],
            [
                "Links and Images",
                "Add links and images to a page.",
                "Use a for links and img with descriptive alt text for images.",
                `<a href="about.html">About</a>
<img src="photo.jpg" alt="A landscape">`
            ],
            [
                "Lists and Forms",
                "Group information and collect user input.",
                "Use ul or ol for lists and label/input for forms.",
                `<ul>
<li>HTML</li>
<li>CSS</li>
</ul>`
            ],
            [
                "CSS Selectors and Colours",
                "Style elements with CSS rules.",
                "A CSS rule uses a selector and declarations.",
                `h1 { color: purple; }
.card { background: #f4edff; }`
            ],
            [
                "Box Model and Spacing",
                "Understand margin, border and padding.",
                "Padding is inside the border; margin is outside it.",
                `* { box-sizing: border-box; }
.card { padding: 20px; margin: 12px; }`
            ],
            [
                "Flexbox and Responsive Design",
                "Build flexible layouts for different screens.",
                "Flexbox arranges items; media queries adapt styles to viewport width.",
                `.row { display: flex; gap: 16px; }
@media(max-width:600px) {
    .row { flex-direction: column; }
}`
            ]
        ]
    ],

    javascript: [
        "JavaScript Essentials",
        [
            [
                "What is JavaScript?",
                "Discover how JavaScript adds behaviour to websites.",
                "It responds to events and can update page content.",
                `console.log("Hello, JavaScript!");`
            ],
            [
                "Variables and Data Types",
                "Store information with let and const.",
                "Use const by default and let when reassignment is needed.",
                `const learner = "Alex";
let lessons = 0;
const active = true;`
            ],
            [
                "Operators and Comparisons",
                "Calculate and compare values.",
                "Comparisons return true or false; === checks strict equality.",
                `const total = 12 + 8;
console.log(total >= 10);`
            ],
            [
                "Conditions",
                "Make decisions using if and else.",
                "Run different blocks depending on a condition.",
                `if (score >= 50) {
    console.log("Passed");
} else {
    console.log("Try again");
}`
            ],
            [
                "Loops",
                "Repeat tasks with for and while.",
                "A for loop is useful for a known number of repetitions.",
                `for (let i = 1; i <= 5; i++) {
    console.log(i);
}`
            ],
            [
                "Functions",
                "Create reusable blocks of code.",
                "Functions accept parameters and can return a result.",
                `function add(a, b) {
    return a + b;
}
console.log(add(2, 3));`
            ],
            [
                "Arrays and Objects",
                "Organise related data.",
                "Arrays store ordered values; objects store key-value pairs.",
                `const skills = ["HTML", "CSS"];
const user = { name: "Sam" };`
            ],
            [
                "DOM and Events",
                "Respond to actions on a webpage.",
                "Select an element and attach an event listener.",
                `document.querySelector("button")
.addEventListener("click", () => {
    alert("Hi!");
});`
            ]
        ]
    ],

    python: [
        "Python Core",
        [
            [
                "Getting Started with Python",
                "Run your first Python statement.",
                "Python is known for readable syntax; print displays output.",
                `print("Hello, world!")`
            ],
            [
                "Variables and Data Types",
                "Store text, numbers and boolean values.",
                "Common types include int, float, str and bool.",
                `name = "Asha"
age = 19
active = True
print(name, age)`
            ],
            [
                "Input and Output",
                "Read user input and display a result.",
                "input returns text; convert it when you need a number.",
                `name = input("Your name: ")
print("Welcome", name)`
            ],
            [
                "Operators and Conditions",
                "Calculate and make decisions.",
                "Indentation defines the block belonging to an if statement.",
                `marks = 72

if marks >= 50:
    print("Passed")
else:
    print("Try again")`
            ],
            [
                "Loops",
                "Repeat instructions with for and while.",
                "A for loop can iterate through a range or collection.",
                `for number in range(1, 6):
    print(number)`
            ],
            [
                "Lists and Dictionaries",
                "Store collections and key-value data.",
                "Lists are ordered; dictionaries map keys to values.",
                `skills = ["HTML", "CSS"]
student = {"name": "Asha"}

print(student["name"])`
            ],
            [
                "Functions",
                "Write reusable code using def.",
                "Parameters receive input and return sends a result back.",
                `def add(a, b):
    return a + b

print(add(4, 6))`
            ],
            [
                "Mini Project: Calculator",
                "Combine input and arithmetic in a tiny project.",
                "Read two numbers, calculate their sum and display it.",
                `a = float(input("First number: "))
b = float(input("Second number: "))

print(a + b)`
            ]
        ]
    ],

    java: [
        "Java Fundamentals",
        [
            [
                "Introduction to Java",
                "Understand Java and a basic program.",
                "Java source is compiled to bytecode that runs on the JVM.",
                `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello!");
    }
}`
            ],
            [
                "Variables and Data Types",
                "Declare variables with Java data types.",
                "Java is statically typed; declare a type for each variable.",
                `int age = 18;
double price = 99.5;
String name = "Maya";
boolean active = true;`
            ],
            [
                "Operators",
                "Calculate and compare values.",
                "Arithmetic operators calculate; comparisons return booleans.",
                `int total = 10 + 5;
boolean large = total > 12;`
            ],
            [
                "Conditions",
                "Control flow with if and else.",
                "The if block runs when its condition is true.",
                `if (marks >= 50) {
    System.out.println("Passed");
} else {
    System.out.println("Try again");
}`
            ],
            [
                "Loops",
                "Repeat code with for and while.",
                "Use for for a known number of repetitions.",
                `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`
            ],
            [
                "Methods",
                "Create reusable operations.",
                "Methods have a name, optional parameters and a return type.",
                `static int add(int a, int b) {
    return a + b;
}`
            ],
            [
                "Classes and Objects",
                "Start learning object-oriented programming.",
                "A class describes fields and methods; an object is its instance.",
                `class Student {
    String name;
}`
            ],
            [
                "Arrays and Mini Project",
                "Store values and calculate a total.",
                "An array stores a fixed-size sequence of one type.",
                `int[] marks = {80, 75, 90};
int total = 0;

for (int mark : marks) {
    total += mark;
}

System.out.println(total);`
            ]
        ]
    ]
};


// LESSON STATE
let activeCourse = "html";
let activeLesson = 0;

let completed = JSON.parse(
    localStorage.getItem("uncodeDone") || "{}"
);


// DISPLAY LESSON
function renderLesson() {
    const [title, items] = syllabi[activeCourse];
    const done = completed[activeCourse] || [];
    const lesson = items[activeLesson];

    document.getElementById("lessonCourseTitle").textContent = title;

    document.getElementById("lessonNumber").textContent =
        `LESSON ${String(activeLesson + 1).padStart(2, "0")} / ${items.length}`;

    document.getElementById("lessonDuration").textContent = "10–15 min";

    document.getElementById("lessonTitle").textContent = lesson[0];
    document.getElementById("lessonIntro").textContent = lesson[1];

    document.getElementById("lessonBody").innerHTML = `
        <h2>Lesson overview</h2>
        <p>${lesson[2]}</p>

        <h2>Try to understand</h2>
        <p>
            Read the example, then change it and observe what happens.
            Practise the idea before moving to the next lesson.
        </p>
    `;

    document.getElementById("lessonCode").textContent = lesson[3];

    // LESSON LIST
    document.getElementById("lessonList").innerHTML = items
        .map((item, index) => `
            <button class="lesson-item
                ${index === activeLesson ? "active" : ""}
                ${done.includes(index) ? "done" : ""}"
                data-index="${index}">

                <span class="lesson-item-number">
                    ${done.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}
                </span>

                <span>
                    <strong>${item[0]}</strong>
                    <small>10–15 min</small>
                </span>
            </button>
        `)
        .join("");

    document.querySelectorAll("[data-index]").forEach(button => {
        button.onclick = () => {
            activeLesson = Number(button.dataset.index);
            renderLesson();
        };
    });

    // PROGRESS
    const percentage = Math.round(
        done.length / items.length * 100
    );

    document.getElementById("lessonProgressText").textContent =
        percentage + "%";

    document.getElementById("lessonProgressBar").style.width =
        percentage + "%";

    // PREVIOUS / NEXT
    document.getElementById("previousLesson").disabled =
        activeLesson === 0;

    document.getElementById("nextLesson").disabled =
        activeLesson === items.length - 1;

    document.getElementById("completeLesson").textContent =
        done.includes(activeLesson)
            ? "Completed ✓"
            : "Mark as complete";
}


// OPEN COURSE
function openCourse(key) {
    activeCourse = key;
    activeLesson = 0;

    renderLesson();
    showPage("lessons");
}

document.querySelectorAll(".course-card").forEach(card => {
    card.querySelector(".continue-button")?.addEventListener("click", () => {
        openCourse(card.dataset.course);
    });
});


// LESSON NAVIGATION
document.getElementById("backToCourses").onclick = () => {
    showPage("courses");
};

document.getElementById("previousLesson").onclick = () => {
    if (activeLesson > 0) {
        activeLesson--;
        renderLesson();
    }
};

document.getElementById("nextLesson").onclick = () => {
    const total = syllabi[activeCourse][1].length;

    if (activeLesson < total - 1) {
        activeLesson++;
        renderLesson();
    }
};


// MARK LESSON COMPLETE
document.getElementById("completeLesson").onclick = () => {
    const done = completed[activeCourse] || [];

    if (!done.includes(activeLesson)) {
        done.push(activeLesson);
    }

    completed[activeCourse] = done;

    localStorage.setItem(
        "uncodeDone",
        JSON.stringify(completed)
    );

    renderLesson();
};


// COPY CODE EXAMPLE
document.getElementById("copyLessonCode").onclick = async () => {
    try {
        await navigator.clipboard.writeText(
            document.getElementById("lessonCode").textContent
        );

        document.getElementById("copyLessonCode").textContent =
            "Copied ✓";

    } catch {
        alert("Please select and copy the code.");
    }
};


// PROJECT BUTTONS
document.querySelectorAll(".start-button").forEach(button => {
    button.onclick = () => {
        alert("Project workspace will be added next.");
    };
});


// WORKSHOP BUTTONS
document.querySelectorAll(".register-btn").forEach(button => {
    button.onclick = () => {
        alert("Workshop registration will be connected later.");
    };
});


// WORKSHOP SCROLL BUTTONS
document.querySelectorAll("[data-scroll]").forEach(button => {
    button.onclick = () => {
        document.getElementById(button.dataset.scroll)
            ?.scrollIntoView({ behavior: "smooth" });
    };
});


// NOTIFICATION BUTTON
document.querySelector(".notification")?.addEventListener("click", () => {
    alert("You're all caught up!");
});


// LOGIN AND SIGNUP DEMO
let authMode = "login";

function setAuth(mode) {
    authMode = mode;

    document.querySelectorAll(".auth-tab").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.authMode === mode
        );
    });

    const isSignup = mode === "signup";

    document.getElementById("authHeading").textContent =
        isSignup ? "Create your account" : "Welcome back!";

    document.getElementById("authSubtitle").textContent =
        isSignup
            ? "Start your learning journey."
            : "Log in to continue learning.";

    document.getElementById("authName").classList.toggle(
        "auth-hidden",
        !isSignup
    );

    document.getElementById("nameLabel").classList.toggle(
        "auth-hidden",
        !isSignup
    );

    document.getElementById("authName").required = isSignup;

    document.getElementById("authSubmit").textContent =
        isSignup ? "Create account →" : "Log in →";

    document.getElementById("authMessage").textContent = "";
}


// LOGIN TABS
document.querySelectorAll(".auth-tab").forEach(button => {
    button.onclick = () => setAuth(button.dataset.authMode);
});


// LOGIN BUTTON
document.getElementById("loginOpenBtn").onclick = () => {
    setAuth("login");
    showPage("login");
};


// PROFILE BUTTON
document.querySelector(".profile-icon")?.addEventListener("click", () => {
    setAuth("login");
    showPage("login");
});


// BACK TO WEBSITE
document.getElementById("backFromLogin").onclick = () => {
    showPage("home");
};


// DEMO LOGIN FORM
document.getElementById("authForm").onsubmit = event => {
    event.preventDefault();

    const username =
        authMode === "signup"
            ? document.getElementById("authName").value.trim()
            : document.getElementById("authEmail").value.split("@")[0];

    document.getElementById("authMessage").textContent =
        `Demo ${authMode} complete. Welcome, ${username}! No details were sent or stored.`;

    document.querySelector("#loginOpenBtn span").textContent =
        username;
};


// START WEBSITE
showPage("home");