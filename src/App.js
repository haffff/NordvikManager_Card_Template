import React from "react";
import "./App.css";

function App({ Api }) {
  const [test, setTest] = React.useState(0);
  
  React.useEffect(() => {
    const asyncTest = async () => {
      Api.Properties.Subscribe("test", ({value}) => {
        setTest(value);
      });

      await Api.Properties.Init("test", 1);

      const testProperty = await Api.Properties.Get("test");
      setTest(testProperty.value);
    }

    asyncTest();
  }, []);

  return (
    <div>
      Your code here
      <div>Test property = {test}</div>
      <button onClick={() => Api.Properties.Set("test", test + 1)}>Increment</button>
    </div>
  );
}

export default App;
