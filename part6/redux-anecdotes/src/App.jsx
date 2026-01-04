import AncedoteForm from "./components/AncedoteForm";
import AncedoteList from "./components/AncedoteList";
import FilterForm from "./components/FilterForm";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <FilterForm />
      <Notification />
      <AncedoteList />
      <AncedoteForm />
    </div>
  );
};

export default App;
