import style from "../styles/modules/title.module.scss";

function PageTitle({ children, ...rest }: IPageTitleProps) {
    return (
        <p className={style.title} {...rest}>
            {children}
        </p>
    )
}

export default PageTitle

interface IPageTitleProps {
    children: React.ReactNode,
}