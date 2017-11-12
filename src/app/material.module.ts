import { NgModule } from '@angular/core';
import {MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatGridListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatTableModule,
        MatToolbarModule} from '@angular/material';

const matModules = [MatButtonModule,
                    MatCheckboxModule,
                    MatListModule,
                    MatIconModule,
                    MatCardModule,
                    MatInputModule,
                    MatGridListModule,
                    MatSelectModule,
                    MatSnackBarModule,
                    MatDialogModule,
                    MatDatepickerModule,
                    MatNativeDateModule,
                    MatTooltipModule,
                    MatAutocompleteModule,
                    MatTableModule,
                    MatToolbarModule
                  ];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MyCustomMaterialModule { }

