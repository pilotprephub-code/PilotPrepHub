const nav_inst_oxford_18 = 
[
  {
    question: "INS errors are classified as “Bounded errors” and “Unbounded errors”.",
    options: [
      "An “Unbounded error” is an error that increases with time, an example being the distance gone error due to a ground speed error.",
      "An “Unbounded error” is an error that increases with time, an example being an increasing ground speed error due to the platform not being levelled correctly.",
      "A “Bounded error” is an error that is subject to sudden unpredictable random changes. Most notable during pitching manoeuvres and when raising or lowering flap and U/C.",
      "A “Bounded error” is an error that is “tied” to the real wander rates of the gyros on the platform."
    ],
    answer: "An “Unbounded error” is an error that increases with time, an example being the distance gone error due to a ground speed error."
  },
  {
    question: "Two checks that can be carried out to check that two selected sequential waypoints have been entered correctly are:",
    options: [
      "select DSR.TK/STS and check that the status is less than 4; select DIS/TIME and check that the time agrees with the flight plan time.",
      "select DIS/TIME and check that the distance agrees with the distance on the flight plan; then check that the time agrees with the flight plan time for the leg",
      "select DIS/TIME and check that the distance agrees with the distance on the flight plan; select DSR.TK/STS and check that the track agrees with the flight plan track for the leg.",
      "select DIS/TIME and check that the distance agrees with the distance on the flight plan; select HDG/DA and check that the heading agrees with the flight plan heading for the leg."
    ],
    answer: "select DIS/TIME and check that the distance agrees with the distance on the flight plan; select DSR.TK/STS and check that the track agrees with the flight plan track for the leg."
  },
  {
    question: "In an INS the E/W accelerations are converted into an E/W speed (kt) at the first stage of integration and into E/W distance gone (nm) at the second stage of integration. This gives:",
    options: [
      "departure which is multiplied by Cosine of the present latitude of obtain d'long (min) which is used to automatically up-date the present longitude.",
      "d'long (min) which is used to automatically up-date the present longitude.",
      "departure which is multiplied by Secant of the present latitude to obtain d'long (min) which is used to automatically up-date the present longitude.",
      "departure which is multiplied by Sine of the present latitude to obtain d'long (min) which is used to automatically up-date the present longitude."
    ],
    answer: "departure which is multiplied by Secant of the present latitude to obtain d'long (min) which is used to automatically up-date the present longitude."
  },
  {
    question: "At the second stage of integration E/W speed is converted into E/W distance gone. To convert this departure into change of longitude is has to:",
    options: [
      "be divided by Secant of the latitude.",
      "be multiplied by Secant of the latitude",
      "be divided by Tangent of the latitude.",
      "be multiplied by Cosine of the latitude."
    ],
    answer: "be multiplied by Secant of the latitude"
  },
  {
    question: "The amber ALERT light on an INS control and display unit:",
    options: [
      "illuminates steadily 2 minutes, in AUTO mode, before reaching the next waypoint.",
      "start flashing 2 minutes before reaching the next waypoint and goes out at 30 seconds to run.",
      "illuminates if power from the aircraft bus bar has been lost and the system is operating on standby battery.",
      "illuminates steadily after passing a waypoint in manual mode, until the next leg is programmed in."
    ],
    answer: "illuminates steadily 2 minutes, in AUTO mode, before reaching the next waypoint."
  },
  {
    question: "",
    options: [
      "all the above statements are true.",
      "only (ii), (iii) and (iv) of the above statements are true.",
      "only (i), (ii) and (iii) of the above statements are true.",
      "only (ii) and (iii) of the above statements are true."
    ],
    answer: "only (ii) and (iii) of the above statements are true."
  },
  {
    question: "The computer of a north referenced Inertial Navigation System (INS) in flight, provides compensation for:",
    options: [
      "aircraft manoeuvres, real wander, apparent wander, transport wander.",
      "coriolis, real wander, apparent wander, transport wander.",
      "earth rotation, transport wander, coriolis.",
      "transport wander, apparent wander, coriolis, magnetic variation."
    ],
    answer: "earth rotation, transport wander, coriolis."
  },
  {
    question: "The diagram below shows the situation after an aircraft, equipped with INS, has passed over way point 2 and is tracking along the line TK (dashed). Using the information given in the diagram, and the fact that with DA/HDG selected on the control and display unit (CDU) of the INS, the display shows 6L/080, answer the following question ..When DSRTK/STS is selected on the CDU, the left window will show:",
    options: [
      "074",
      "086",
      "068",
      "080"
    ],
    answer: "068"
  },
  {
    question: "When XTK/TKE is selected on the CDU, the display will show (to the nearest whole number):",
    options: [
      "LEFT DISPLAY 5L RIGHT DISPLAY 6R",
      "LEFT DISPLAY 5R. RIGHT DISPLAY 6R",
      "LEFT DISPLAY 5L RIGHT DISPLAY 6L"
    ],
    answer: "LEFT DISPLAY 5R. RIGHT DISPLAY 6R"
  },
  {
    question: "During initialisation of an INS the aircraft must not be moved until:",
    options: [
      "The ramp position has been inserted and checked.",
      "The platform is levelled.",
      "The gyros and accelerometers are in the “null” position.",
      "The green “ready NAV” light has been illuminated and the mode selector switch has been set to the “NAV” position"
    ],
    answer: "The green “ready NAV” light has been illuminated and the mode selector switch has been set to the “NAV” position"
  }
]
;