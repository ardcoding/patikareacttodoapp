import './App.css';
import TodoHeader from './components/TodoHeader';

function App() {

  return (
    <div className="root">
      <section className='todoapp'>
      <TodoHeader />
      <h1>TODOS</h1>      
      </section>
    </div>
  );
}

export default App;
