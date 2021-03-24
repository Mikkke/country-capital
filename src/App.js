import { useState } from "react";
import axios from "axios";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then((res) => {
          setCountryData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error :>> ", error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error :>> ", error);
      setLoading(false);
    }
  };
  console.log("countryData :>> ", countryData);

  return (
    <section className="app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pays"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="send">
          Rechercher
        </button>
      </form>

      {loading === true ? (
        <div className="loader"></div>
      ) : (
        <div className="container">
          {countryData.map((el, index) => {
            return (
              <div className="card" key={index}>
                <h1>Nom : {el.name} </h1>
                <h4> Capital :{el.capital}</h4>
                <h4> Population :{el.population}</h4>
                <h4> region :{el.region}</h4>
                <h4> subregion :{el.subregion}</h4>
                <h4> Indication : +{el.callingCodes[0]}</h4>
                <div>
                  langue :
                  {el.languages.map((el, index) => {
                    return (
                      <div key={index}>
                        {el.name} {el.nativeName}
                      </div>
                    );
                  })}
                </div>
                <img src={el.flag} alt={el.name} />
                <div>
                  {el.currencies.map((el, index) => {
                    return (
                      <ul key={index}>
                        Monnaie :<li>code :{el.code}</li>
                        <li> nom :{el.name}</li>
                        <li> symbol :{el.symbol}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default App;
