import './AddForm.css';
import {Btn} from "../common/Btn";
import {SyntheticEvent, useState} from "react";
import {geocode} from "../../utils/geocoding";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: {
            street: '',
            city: '',
        },
    });

    const saveAd = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const {lat, lon} = await geocode(`${form.address.street}, ${form.address.city}`);

            if (!lat || !lon) {
                console.log('Nie można znaleźć podanego adresu.');
            }

            const res = await fetch('http://localhost:3001/ad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                }),
            });
            const data = await res.json();
            setId(data.id);

        } finally {
            setLoading(false);
        }

    }

    const updateForm = (key: string, value: any) => {
        if (key === 'street' || key === 'city') {
            setForm(form => ({
                ...form,
                address: {
                    ...form.address,
                    [key]: value,
                }
            }));
        } else {
            setForm(form => ({
                ...form,
                [key]: value,
            }));
        }
    };

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }

    if (id) {
        return <h2>Twoje ogłoszenie "{form.name}" zostało poprawnie dodane do serwisu pod numerem ID {id}</h2>
    }

    return <form className="add-form" action="" onSubmit={saveAd}>
        <h1>Dodawanie ogłoszenia</h1>
        <p>
            <label>
                Nazwa: <br/>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={99}
                    value={form.name}
                    onChange={e => updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Opis: <br/>
                <textarea
                    name="description"
                    maxLength={999}
                    value={form.description}
                    onChange={e => updateForm('description', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Cena: <br/>
                <input
                    type="number"
                    name="price"
                    required
                    maxLength={99}
                    value={form.price}
                    onChange={e => updateForm('price', Number(e.target.value))}
                /> <br/>
                <small> Pozostaw zero w polu, aby nie wyświetlać ceny.</small>
            </label>
        </p>
        <p>
            <label>
                Adres URL ogłoszenia: <br/>
                <input
                    type="url"
                    name="url"
                    maxLength={99}
                    value={form.url}
                    onChange={e => updateForm('url', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Adres na mapie: <br/>
                <input
                    type="text"
                    name="street"
                    required
                    value={form.address.street}
                    onChange={e => updateForm('street', e.target.value)}
                /> <br/> <small>Ulica i numer</small>
                <input
                    type="text"
                    name="city"
                    required
                    value={form.address.city}
                    onChange={e => updateForm('city', e.target.value)}
                /> <br/> <small>Miasto</small>
            </label>
        </p>

        <Btn text="Zapisz"/>
    </form>
}