import { render, screen } from '@testing-library/react';
import Form from './components/Form';
import Calculator from './components/Calculator';
import Login from './components/Login';

test('vorm test', () => {
  render(<Form />);

  const q1 = screen.getByText(/Mis on looma liik?/i);
  const q2 = screen.getByText(/Mis on looma sünnikuupäev?/i);
  const q3 = screen.getByText(/Mitu min on sul kindlasti iga päeva hommikul vaba aega tegeleda loomaga?/i);
  const q4 = screen.getByText(/Mitu min on sul kindlasti iga päeva õhtul vaba aega tegeleda loomaga?/i);
  const q5 = screen.getByText(/Mitu min on sul kindlasti iga päeva keskel vaba aega tegeleda loomaga?/i);
  const q6 = screen.getByText(/Mitu h nädalas saad sa lisaks loomaga tegeleda?/i);
  const q7 = screen.getByText(/Mitu päeva kuus keskmiselt oled sa kodust eemal?/i);
  const q8 = screen.getByText(/Kui palju raha saad sa kuus loomale kulutada?/i);
  const is = screen.queryAllByText(/input/i);

  expect(q1).toBeInTheDocument();
  expect(q2).toBeInTheDocument();
  expect(q3).toBeInTheDocument();
  expect(q4).toBeInTheDocument();
  expect(q5).toBeInTheDocument();
  expect(q6).toBeInTheDocument();
  expect(q7).toBeInTheDocument();
  expect(q8).toBeInTheDocument();
  expect(is.length).toBe(9);
});


test('kalkulaator test1', () => {
  
  render(<Calculator species="Spider" age="10" minInMorning="50" minInEvening="50" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/Te saate/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test2', () => {
  
  render(<Calculator species="Spider" age="10" minInMorning="50" minInEvening="20" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/Te ei saa/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test3', () => {
  
  render(<Calculator species="Spider" age="3" minInMorning="50" minInEvening="50" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/Te ei saa/i);

  expect(result).toBeInTheDocument();
});

test('login test', () => {
  render(<Login/>)

  const email = screen.getByText(/Email:/i);
  const password = screen.getByText(/Password:/i);
  const is = screen.queryAllByText(/input/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(is.length).toBe(9);
});

test('logout test', () => {
  render(<Logout/>)

  const link = screen.getByText(/Logout/i);
  
  expect(link).toBeInTheDocument();
});

test('register test', () => {
  render(<Register/>)

  const email = screen.getByText(/Email:/i);
  const password = screen.getByText(/Password:/i);
  const cpassword = screen.getByText(/Confirm password:/i);
  const sq = screen.getByText(/Security question:/i);
  const sa = screen.getByText(/Security answer:/i);
  const is = screen.queryAllByText(/input/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(cpassword).toBeInTheDocument();
  expect(sq).toBeInTheDocument();
  expect(sa).toBeInTheDocument();
  expect(is.length).toBe(9);
});

test('kalkulaator test4', () => {
  
  render(<LoginCalculator pets={[{name: "Sfoje", type: "Spider"},{name: "Sfdje", type: "Spider"}]} species="Spider" age="10" minInMorning="50" minInEvening="50" minInDay="50" hInWeek="12" dInMonth="6" moneyInMonth="200" />);

  const result = screen.getByText(/Te ei saa/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test2', () => {
  
  render(<LoginCalculator pets={[{name: "Sfoje", type: "Spider"},{name: "Sfdje", type: "Spider"}]} species="Spider" age="10" minInMorning="500" minInEvening="500" minInDay="500" hInWeek="120" dInMonth="60" moneyInMonth="2000" />);

  const result = screen.getByText(/Te saate/i);

  expect(result).toBeInTheDocument();
});

test('kalkulaator test3', () => {
  
  render(<LoginCalculator pets={[{name: "Sfoje", type: "Spider"},{name: "Sfdje", type: "Spider"}]} species="Spider" age="1" minInMorning="500" minInEvening="500" minInDay="500" hInWeek="120" dInMonth="60" moneyInMonth="2000" />);

  const result = screen.getByText(/Te ei saa/i);

  expect(result).toBeInTheDocument();
});

test('profile test', () => {
  render(<Profile/>)

  const email = screen.getByText(/Muuda emaili/i);
  const password = screen.getByText(/Muuda salasõna/i);
  const cpassword = screen.getByText(/Salasõna kordus/i);
  const sq = screen.getByText(/Taastamisküsimus/i);
  const sa = screen.getByText(/Taastamisküsimuse vastus/i);
  const del = screen.getByText(/Kasutaja kustutamine/i);
  const is = screen.queryAllByText(/input/i);

  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(cpassword).toBeInTheDocument();
  expect(sq).toBeInTheDocument();
  expect(sa).toBeInTheDocument();
  expect(del).toBeInTheDocument();
  expect(is.length).toBe(6);
});

test('manager test', () => {
  render(<Manager/>)

  const name = screen.getByText(/Nimi/i);
  const dob = screen.getByText(/Sünnikuupäev/i);
  const type = screen.getByText(/Liik/i);
  

  const ename = screen.getByText(/Mis on looma nimi?/i);
  const edob = screen.getByText(/Mis on looma sünnikuupäev?/i);
  const etype = screen.getByText(/Mis on looma liik?/i);
  const edob = screen.getByText(/Mis on looma sünnikuupäev?/i);

  const del = screen.getByText(/Kustuta/i);
  
  const is = screen.queryAllByText(/input/i);

  expect(name).toBeInTheDocument();
  expect(dob).toBeInTheDocument();
  expect(type).toBeInTheDocument();
  

  expect(ename).toBeInTheDocument();
  expect(edob).toBeInTheDocument();
  expect(etype).toBeInTheDocument();
  expect(edob).toBeInTheDocument();

  expect(del).toBeInTheDocument();
  
  expect(is.length).toBe(6);

});