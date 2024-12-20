import styled from "styled-components";

// Updated way to use import svg files using vite-plugin-svgr.
// See link below for explanation:
// Link: https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import ShoppingSvg from '../../assets/shopping-bag.svg?react';

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`