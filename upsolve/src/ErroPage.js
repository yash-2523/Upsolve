import NavigationMenu from './NavigationMenu'

function ErrorPage() {
    return(
        <div>
            <NavigationMenu></NavigationMenu>
            
                <p className="text-danger font-weight-bolder min-vw-100 display-4 d-flex justify-content-center align-items-center" style={{height: "80vh"}}>Error 404: Page not Found</p>
            
        </div>
    )
}

export default ErrorPage;