import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import texts from "../../utils/Texts";
import { useLanguage } from "../../context/LanguageContext";

import Categories from "../categories/Categories";
import ProbChooser from "../probChooser/ProbChooser";
import PriceChooser from "../priceChooser/PriceChooser";
import WeightChooser from "../weightChooser/WeightChooser";


import "./FilterBox.scss";

export default function FilterBox({ seller }) {
  const { language } = useLanguage();
  const text = texts[language] || texts.en;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [probe, setProbe] = useState([]);
  const [price, setPrice] = useState([null, null]);
  const [weight, setWeight] = useState([null, null]);
  const [sellerId, setSellerId] = useState("any");
  const [showOnMobile, setShowOnMobile] = useState(false)

const applyFilters = () => {


  const newUrl = 
  `/products/category/${categories.length > 0 ? categories.join("_") : "any"}/standard/${probe.length > 0 ? probe.join("_") : "any"}/minPrice/${price[0] === null ? "0" : price[0]}/maxPrice/${price[1] === null ? "any" : price[1]}/minWeight/${weight[0] === null ? "0" : weight[0]}/maxWeight/${weight[1] === null ? "any" : weight[1]}/seller/${sellerId ? sellerId : 
  "any"}`
  navigate(newUrl.toString())
};


  const getCategories = (categoriesData) => {
    setCategories(categoriesData);
  };

  const getProbes = (probesData) => {
    setProbe(probesData);
  };

  // Update seller state
  useEffect(() => {
    seller ? setSellerId(seller._id) : setSellerId("any");
    console.log(sellerId)
  }, [sellerId]);

 
  const toggleOnMobile = () => {
    setShowOnMobile(!showOnMobile)
  }
 

  return (
    <div className="filter_box">
      
      <div className="mobile_filter">
      <button className="show_filter" onClick={() => toggleOnMobile()}>{text.filter}</button>
       {showOnMobile ?  <div className="filter_tool">
          <Categories getData={getCategories} />
          <ProbChooser getData={getProbes} />
          <PriceChooser setPrice={setPrice} />
          <WeightChooser setWeight={setWeight} /> <button className="filter_btn" onClick={()=> applyFilters()}>{text.goFilter}</button></div>
        : null} </div>
        
       <div className="desktop_filter">
       <div className="filter_tool">
          <Categories getData={getCategories} />
          <ProbChooser getData={getProbes} />
          <PriceChooser setPrice={setPrice} />
          <WeightChooser setWeight={setWeight} /> <button className="filter_btn" onClick={()=> applyFilters()}>{text.goFilter}</button></div>
       </div>
      
    </div>
  );
}
