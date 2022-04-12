import { CurrencyTypes } from '../enums/enums';

class AmountFormat {

    static formatPriceARS = ( currency: CurrencyTypes, amount: number, decimals: number ): string => {

        const formatter = new Intl.NumberFormat( 'es-AR', {
            style: 'currency',
            currency: 'ARS'
        });

        const price = currency === CurrencyTypes.arg ?
            decimals > 0 ? ( `${amount}.${decimals}` ) : `${amount}`
            : '';
        const priceFormatted = formatter.format( parseFloat( price ) );
        return (
            priceFormatted.split( ',' )[1] === '00' )
            ? priceFormatted.split( ',' )[0]
            : priceFormatted;
    };

    static formatQuantity = ( num: number ): string => {

        const formatter = new Intl.NumberFormat( 'es-AR', {
            style: 'currency',
            currency: 'ARS'
        });

        return ( formatter.format( num ) );
    };

    static formatARSAmount = ( amount: number ): string => {
        return ( `$ ${amount.toLocaleString( 'es-AR' )}` );
    };
}

export default AmountFormat;
