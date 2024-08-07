import SubjectCard from "components/subjectCard/SubjectCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import restClient from "restClient";

function SubjectTab() {
  const { instituteId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [studentSubjects, setStudentSubjects] = useState([]);

  const getAllSubjects = async () => {
    try {
      let url = "/subject";

      if (instituteId) url = `/subject/${instituteId}`;

      setIsLoading(true);

      const { data } = await restClient({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.status === "success") {
        setSubjectData(data.subjects);
        setTotalSubjects(data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentSubjects = async () => {
    try {
      let url = "/studentSubject";

      if (instituteId) url = `/studentSubject/${instituteId}`;

      setIsLoading(true);

      const { data } = await restClient({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.status === "success") {
        setStudentSubjects(data.studentSubjects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllSubjects();
    getStudentSubjects();
  }, []);

  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex gap-[3rem]">
        <div className="flex gap-[0.6rem] text-primary-black font-semibold">
          <span className="font-semibold text-primary-grape">
            Total Subjects:
          </span>{" "}
          <span className="text-primary-black">{totalSubjects}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex justify-center pt-6">
            <ClipLoader color="#be4bdb" size={40} />
          </div>
        )}
        {!isLoading &&
          subjectData.map((subject) => (
            <SubjectCard
              subject={subject}
              studentSubject={studentSubjects.find(
                (sSubject) => sSubject.subjectId === subject._id,
              )}
            />
          ))}
      </div>
    </div>
  );
}

export default SubjectTab;
