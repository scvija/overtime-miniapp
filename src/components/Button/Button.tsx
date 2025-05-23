import React, { CSSProperties } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    textColor?: string;
    backgroundColor?: string;
    hoverColor?: string;
    borderColor?: string;
    borderRadius?: string;
    onClick?: any;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    disabled?: boolean;
    additionalStyles?: CSSProperties;
    children?: any;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({
    width,
    height,
    padding,
    textColor,
    backgroundColor,
    hoverColor,
    borderColor,
    borderRadius,
    margin,
    onClick,
    disabled,
    additionalStyles,
    fontSize,
    fontWeight,
    lineHeight,
    children,
    ...rest
}) => {
    return (
        <Wrapper
            width={width}
            height={height}
            padding={padding}
            margin={margin}
            textColor={textColor}
            backgroundColor={backgroundColor}
            hoverColor={hoverColor}
            borderColor={borderColor}
            borderRadius={borderRadius}
            onClick={onClick}
            disabled={disabled}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            style={additionalStyles}
            {...rest}
        >
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.button<{
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    textColor?: string;
    backgroundColor?: string;
    hoverColor?: string;
    borderColor?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
}>`
    display: flex;
    text-transform: uppercase;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width || 'auto'};
    min-height: ${(props) => props.height || '28px'};
    border: 1px solid ${(props) => props.borderColor || props.theme.button.borderColor.primary};
    border-radius: ${(props) => props.borderRadius || '5px'};
    ${(props) => (props.style?.fontFamily ? `font-family: ${props.style?.fontFamily};` : '')}
    font-weight: ${(props) => props.fontWeight || '600'};
    font-size: ${(props) => props.fontSize || '15px'};
    line-height: ${(props) => props.lineHeight || 'initial'};
    cursor: pointer;
    color: ${(props) => props.textColor || props.theme.button.textColor.primary};
    background: ${(props) => props.backgroundColor || props.theme.button.background.primary};
    margin: ${(props) => props.margin || ''};
    padding: ${(props) => props.padding || '3px 30px'};
    outline: none;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover {
        background: ${(props) => props.hoverColor || props.backgroundColor || props.theme.button.background.primary};
    }
`;

export default Button;
