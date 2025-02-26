import React from "react";
import "./App.css";

function App({ Api }) {
  const [test, setTest] = React.useState(0);
  
  React.useEffect(() => {
    const asyncTest = async () => {
      Api.Properties.Subscribe("test", (value) => {
        setTest(value);
      });
      await Api.Properties.Init("test", 2137);

      const testValue = await Api.Properties.Get("test");
      setTest(testValue.value);
    }

    asyncTest();

  }, []);

  return (
    <div>
      Your code here {test}
      <br />
      <button onClick={() => Api.Properties.Set("test", test + 1)}>Increment</button>
    </div>
  );
}

export default App;
