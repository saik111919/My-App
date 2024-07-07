import Home from "@/View/Home";
import ExpenseTrake from "@/View/ExpenseTrake"

export default function routes() {
  const routes = [
    {
      id:1,
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      id:2,
      path: "/expenses",
      component: ExpenseTrake,
      name: "ExpenseTrake",
    }
    
  ];
  return routes;
}
