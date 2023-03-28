import { SyntheticEvent, useState } from "react"

const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  return [
    values, (e: any) => {
      console.log(e);
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    }
  ]
}

export const UseForm = () => {
  const initialState = { email: '', password: '' };
  const [values, setValues] = useForm(initialState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={setValues} />
      <input type="password" name="password" onChange={setValues} />
      <button type="submit">Submit</button>
    </form>
  );
}