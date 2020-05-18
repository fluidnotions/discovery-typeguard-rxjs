import { assertType } from "typescript-is";
import { Observable, iif, of, combineLatest } from "rxjs";
import { map, retryWhen, concatMap, delay } from "rxjs/operators";
import { Designation } from "./model-ref/designation.model";
import { Employee } from "./model-ref/employee.model";

const assertCombinedCollectionItemTypes = (
  isAssertFunc1: (items: any) => any,
  isAssertFunc2: (items: any) => any
): ((source: Observable<[any[], any[]]>) => Observable<[any[], any[]]>) => {
  return (source: Observable<[any[], any[]]>) =>
    source.pipe(
      map((combinedCols: [any[], any[]]) => {
        isAssertFunc1(combinedCols[0]) && isAssertFunc2(combinedCols[1]);
        return combinedCols;
      }),
      retryWhen((errors) =>
        errors.pipe(
          concatMap((e, i) =>
            iif(
              () => i < 5,
              of(e).pipe(delay(100)),
              of(e).pipe(
                map((err) => {
                  console.warn(
                    `type assertion failed in transformer, will retry`
                  );
                  throw err;
                })
              )
            )
          )
        )
      )
    );
};

let designations = require("../designations.json");
console.log(`DEBUG: designations$`, designations.length)
let employees = require("../employees.json");
console.log(`DEBUG: employees$`, employees.length)

try {
  combineLatest(of(designations), of(employees))
    .pipe(
      assertCombinedCollectionItemTypes(
        (items) => assertType<Designation[]>(items),
        (items) => assertType<Employee[]>(items)
      )
    )
    .subscribe();
} catch (err) {
  console.error(err);
}
