import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {AppLayoutComponent} from '../layout/app.layout.component';
import { UsuariosServiceService } from '../../../src/app/demo/api/Services/usuarios-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    permisosPermitidos: Set<string> = new Set();

    constructor(public layoutService: LayoutService , public UsuariosServiceService: UsuariosServiceService,public CookieService: CookieService,private layoutcomponent: AppLayoutComponent) { }

    // ngOnInit() {
        modelo = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] }
                ]
            },
            // {
            //     label: 'General',
            //     items: [
            //         // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
            //         // { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            {

                label: 'General',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                         routerLink: ['/reporte1']
                     },
                    {
                        label: 'Paginas',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/departamentos'] 
                            },
                            
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/cargos']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/EstadoCivil']
                            },
                            {
                                label: 'Municipio',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/municipio']
                            },
                            {
                                label: 'Empleados',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Empleado']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Cliente']
                            },
                            {
                                label: 'Proveedor',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/proveedor']
                            },
                           
                        ]
                    },
                    // {
                    //     label: 'Crud',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/pages/crud']
                    // },
                    // {
                    //     label: 'Timeline',
                    //     icon: 'pi pi-fw pi-calendar',
                    //     routerLink: ['/pages/timeline']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/notfound']
                    // },
                    // {
                    //     label: 'Login',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/login']
                    // },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // },
                ]
            },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },



            {

                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items: [
                           
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/rol']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/usuario']
                            },
                            
                           
                        ]
                    },
               
                ]
            },


    

   
            {

                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Ventas',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Ventas',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/ventaslistado']
                            },
                     
                        ]
                    },
                    {
                        label: 'Reportes',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Reporte',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/reportes']
                            },
                     

                            {
                                label: 'Reportes Buenos',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/ReporteFiltrado']
                            },
                     
                        ]
                    },
               
                ]
            },


           
            
            {

                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Comercial',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Unidades',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/unidad']
                            },
                          
                            {
                                label: 'Impuesto',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Impuesto']
                            },
                            {
                                label: 'Metodo pago',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/metodoPago']
                            },
                            {
                                label: 'Categoria',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/categoria']
                            },
                            // {
                            //     label: 'Productos',
                            //     icon: 'pi pi-fw pi-lock',
                            //     routerLink: ['/app/Productos']
                            // },
                            {
                                label: 'Sucursales',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/Sucursal']
                            },
                            {
                                label: 'Graficos',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/app/charts']
                            },
                           
                        ]
                        
                    },
               
                ]
                
            },


           


            
       
        ];
    // };
        ngOnInit() {
            const roleId = Number.parseInt(this.CookieService.get('roleID'));

            this.UsuariosServiceService.getPantallasDeRol(roleId).subscribe(pantallasPermitidas => {

                const nombresPermitidos = new Set(pantallasPermitidas.map(pant => pant.pantalla.toLowerCase().trim()));

                // Función para filtrar los subítems
                const filtrarSubitems = (subitems) => {
                    return subitems.filter(opcion => {
                        // Normaliza el nombre del subítem
                        const nombreLowerCase = opcion.label.toLowerCase().trim();
                        // Verifica si el subítem está en los nombres permitidos
                        return nombresPermitidos.has(nombreLowerCase);
                    });
                };

                // Filtrar el menú completo por secciones y subsecciones
                this.model = this.Menucompleto 
                    .map(section => {
                        const itemsFiltrados = section.items.map(subSection => {
                            // Filtra los subítems dentro de cada subsección
                            const subItemsFiltrados = filtrarSubitems(subSection.items || []);
                            return {
                                ...subSection,
                                items: subItemsFiltrados
                            };
                        }).filter(subSection => subSection.items.length > 0);

                        // Devuelve la sección principal solo si hay subítems permitidos
                        return {
                            ...section,
                            items: itemsFiltrados
                        };
                    })
                    .filter(section => section.items.length > 0);
            });
        }
        

            
            Menucompleto  = [
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-globe',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] }
                ]
            },
            {

                label: 'General',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                         routerLink: ['/reporte1']
                     },
                    {
                        label: 'Paginas',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Departamentos',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/app/departamentos'] 
                            },
                            
                            {
                                label: 'Cargos',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/cargos']
                            },
                            {
                                label: 'Estados Civiles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/EstadoCivil']
                            },
                            {
                                label: 'Municipio',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/municipio']
                            },
                            {
                                label: 'Empleados',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Empleado']
                            },
                            {
                                label: 'Clientes',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Clientes']
                            },
                           
                           
                        ]
                    },
                    // {
                    //     label: 'Crud',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/pages/crud']
                    // },
                    // {
                    //     label: 'Timeline',
                    //     icon: 'pi pi-fw pi-calendar',
                    //     routerLink: ['/pages/timeline']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/notfound']
                    // },
                    // {
                    //     label: 'Login',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/login']
                    // },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // },
                ]
            },
            {

                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Acceso',
                        icon: 'pi pi-fw pi-user',
                        items: [
                           
                            {
                                label: 'Roles',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/acceso/rol']
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/usuario']
                            },
                            
                           
                        ]
                    },
               
                ]
            },
            {

                label: '',
                icon: 'pi pi-fw pi-briefcase',
                items: [
               
                    {
                        label: 'Comercial',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Unidades',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/unidad']
                            },
                          
                            {
                                label: 'Impuesto',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Impuesto']
                            },
                            {
                                label: 'Metodo Pago',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/app/Metodo Pago']
                            },
                            {
                                label: 'Categorias',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/Categorias']
                            },
                            // {
                            //     label: 'Productos',
                            //     icon: 'pi pi-fw pi-lock',
                            //     routerLink: ['/app/Productos']
                            // },
                            {
                                label: 'Sucursales',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/app/Sucursal']
                            },
                            {
                                label: 'Graficos',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/app/charts']
                            },
                            {
                                label: 'venta',
                                icon: 'pi pi-fw pi-cart-plus',
                                routerLink: ['/app/venta/factura']
                            },
                           
                        ]
                        
                    },
               
                ]
                
            },


        ];
    }
    
    
    





