
// import { LoggerFactory, UnityFileLogger } from '@gaap/gp-pos-nst-util';
import { Observable, of, iif } from 'rxjs';
import { map, retryWhen, concatMap, delay, catchError } from 'rxjs/operators';

class TransTypeGuardUtilStatic {
  // private logger = LoggerFactory.getLogger(this);
  // private unityLogger = UnityFileLogger.getLogger(this);

  /**
   * https://www.npmjs.com/package/typescript-is
   * 
   * import { assertType } from 'typescript-is';
   * 
   * @param isAssertFunc1 (items) => assertType<T[]>(items)
   * @param isAssertFunc2 (items) => assertType<T[]>(items)
   */
  assertCombinedCollectionItemTypes(
    isAssertFunc1: (items: any) => any,
    isAssertFunc2: (items: any) => any,
  ): (source: Observable<[any[], any[]]>) => Observable<[any[], any[]]> {
    return (source: Observable<[any[], any[]]>) =>
      source.pipe(
        map((combinedCols: [any[], any[]]) => {
          debugger
          isAssertFunc1(combinedCols[0]) && isAssertFunc2(combinedCols[1]);
          return combinedCols;
        }),
        retryWhen(errors =>
          errors.pipe(
            concatMap((e, i) =>
              iif(
                () => i < 5,
                of(e).pipe(delay(100)),
                of(e).pipe(
                  map(err => {
                    // this.logger.warn(`retry count 4 exceeded, type assertion failed in transformer`);
                    // this.logger.error(err.message);
                    // this.unityLogger.warn(`retry count 4 exceeded, type assertion failed in transformer`);
                    // this.unityLogger.error(err.message);
                    console.log(`retry count 4 exceeded, type assertion failed in transformer`);
                    throw err
                  }),
                ),
              ),
            ),
          ),
        ),
        catchError((err: any) => {
          console.log(err.message);
          return source
        })
      )
      
  }
}
export const TransTypeGuardUtil = new TransTypeGuardUtilStatic();
