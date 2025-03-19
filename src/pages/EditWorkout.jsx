import { useParams } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";

const EditWorkout = () => {
  const { id } = useParams();
  return <WorkoutForm workoutId={id} />;
};

export default EditWorkout;
