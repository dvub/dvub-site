import { useEffect, useState } from "react";

const Loading = () => {

    const [quoteObj, setQuoteObj] = useState({});
    useEffect(() => {
      fetch('https://api.quotable.io/random')
        .then((res) => res.json())
        .then((data) => {
          setQuoteObj(data);
        });
    }, []);
    return (
        <div>
            <p>
                <b>Loading...</b>
                <br />
                &quot;{quoteObj.content}&quot;
                <br />
                -{quoteObj.author}
            </p>
        </div>
    );
}
export default Loading;