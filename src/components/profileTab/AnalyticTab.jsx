import { useEffect, useState } from "react";

import restClient from "restClient";
import CircularProgressBar from "components/circularProgressBar/CircularProgressBar";
import { ClipLoader } from "react-spinners";

function AnalyticTab() {
  const [analyticsData, setAnalyticsData] = useState({
    attendence: 0,
    assignment: 0,
    quiz: 0,
    exam: 0,
    grade: "",
    gradePercentage: 0,
  });
  const [aigenerativeData, setAigenerativeData] = useState({
    attendance: "",
    assignments: "",
    quizzes: "",
    exams: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getColor = (grade) => {
    if (grade === "A") return "#20c997";
    else if (grade === "B") return "#339af0";
    else if (grade === "C" || grade === "D") return "#fab005";
    else if (grade === "E" || grade === "F") return "#d9480f";
  };

  const getColor2 = (percentage) => {
    if (percentage >= 80) return "#20c997";
    else if (percentage >= 60 && percentage < 80) return "#339af0";
    else if (percentage >= 30 && percentage < 60) return "#fab005";
    else if (percentage >= 0 && percentage < 30) return "#d9480f";
  };

  const getInsights = async () => {
    try {
      setIsLoading(true);

      const { data } = await restClient({
        method: "GET",
        url: "/analytics",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.status === "success") {
        setAnalyticsData({
          attendence: data.precentageData.attendencePercentage,
          assignment: data.precentageData.assignmentPercentage,
          quiz: data.precentageData.quizPercentage,
          exam: data.precentageData.examPercentage,
          grade: data.precentageData.grade,
          gradePercentage: data.precentageData.gradePercentage,
        });
        setAigenerativeData(data.insightData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <div className="flex gap-[2rem] w-full">
      {isLoading && (
        <div className="flex justify-center pt-6 w-full">
          <ClipLoader color="#1dbbc3" size={40} />
        </div>
      )}
      {!isLoading && (
        <>
          <div
            className={`flex flex-col gap-[2rem] w-fit rounded-[1rem] py-4 px-8 items-center`}
            style={{ border: `2.4px solid ${getColor(analyticsData.grade)} ` }}
          >
            <CircularProgressBar
              grade={analyticsData.grade}
              gradePercentage={analyticsData.gradePercentage}
              color={getColor(analyticsData.grade)}
            />

            <div className="flex flex-col gap-[1rem]">
              <div className="flex justify-between gap-[1rem] text-[1.4rem]">
                <span
                  className="font-semibold "
                  style={{
                    color: getColor2(analyticsData.attendence),
                  }}
                >
                  Attendance
                </span>
                <span
                  style={{
                    color: getColor2(analyticsData.attendence),
                  }}
                >
                  {analyticsData.attendence}%
                </span>
              </div>
              <div className="flex justify-between gap-[1rem] text-[1.4rem]">
                <span
                  className="font-semibold"
                  style={{
                    color: getColor2(analyticsData.assignment),
                  }}
                >
                  Assignment
                </span>
                <span
                  style={{
                    color: getColor2(analyticsData.assignment),
                  }}
                >
                  {analyticsData.assignment}%
                </span>
              </div>
              <div className="flex justify-between gap-[1rem] text-[1.4rem]">
                <span
                  className="font-semibold"
                  style={{
                    color: getColor2(analyticsData.quiz),
                  }}
                >
                  Quiz
                </span>
                <span
                  style={{
                    color: getColor2(analyticsData.quiz),
                  }}
                >
                  {analyticsData.quiz}%
                </span>
              </div>
              <div className="flex justify-between gap-[1rem] text-[1.4rem]">
                <span
                  className="font-semibold"
                  style={{
                    color: getColor2(analyticsData.exam),
                  }}
                >
                  Exam
                </span>
                <span
                  style={{
                    color: getColor2(analyticsData.exam),
                  }}
                >
                  {analyticsData.exam}%
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col gap-[2rem] w-full rounded-[1rem] py-4 px-8`}
            style={{ border: `2.4px solid ${getColor(analyticsData.grade)}` }}
          >
            <ul className="flex flex-col gap-[1.2rem]">
              {/* Grade Overview Message */}
              {aigenerativeData.message && (
                <li>
                  <div className="flex gap-[1rem]">
                    &#8226;
                    <span
                      className="font-semibold text-[1.2rem] min-w-[10rem]"
                      style={{ color: getColor(analyticsData.grade) }}
                    >
                      Grade Overview :
                    </span>
                    <span>{aigenerativeData.message}</span>
                  </div>
                </li>
              )}
            
              {/* Dynamic Sections */}
              {Object.entries(aigenerativeData)
                .filter(([key]) => key !== "message")
                .map(([sectionKey, sectionValue]) => (
                  <li key={sectionKey}>
                    <div className="flex gap-[1rem]">
                      &#8226;
                      <span
                        className="font-semibold text-[1.2rem] min-w-[10rem]"
                        style={{
                          color:
                            sectionKey === "attendance"
                              ? getColor2(analyticsData.attendence)
                              : sectionKey === "assignments"
                              ? getColor2(analyticsData.assignment)
                              : sectionKey === "quizzes"
                              ? getColor2(analyticsData.quiz)
                              : getColor2(analyticsData.exam),
                        }}
                      >
                        {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} :
                      </span>
            
                      <div className="flex flex-col gap-1">
                        {Object.entries(sectionValue).map(([fieldKey, fieldValue]) => (
                          <span key={fieldKey}>
                            • {fieldValue}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticTab;
