import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    padding: 10,
    justifyContent: 'space-between',
  },
  logo: {
    width: 70,
    height: 70
  },
  logoCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textSM: {
    fontSize:12
  },
  section1: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#000',
    borderBottomWidth: 2
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
});

// Create Document Component
const RechnungPDF = ({reciverName, reciverStreetNr, PLZOrt, datum, rechnungNr, itemsList, nettoPrice, tax, toPay}) => (

  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logoCont}>
        <Text>RECHNUNG</Text>
        <Image 
          style={styles.logo} 
          src={require('../images/logo.png')}
          alt='Logo'
        />
      </View>

      <View style={styles.header}>
        <View>
          <Text>An:</Text>
          <Text style={styles.textSM}>{reciverName}</Text>
          <Text style={styles.textSM}>{reciverStreetNr}</Text>
          <Text style={styles.textSM}>{PLZOrt}</Text>
        </View>
        <View>
          <Text>Von:</Text>
          <Text style={styles.textSM}>Bella Italia</Text>
          <Text style={styles.textSM}>Siebenbürgerstr. 2d</Text>
          <Text style={styles.textSM}>85368, Moosburg an der Isar</Text>
        </View>
      </View>

      <View style={styles.section1}>
          <Text style={styles.textSM}>Datum:{datum}</Text>
          <Text style={styles.textSM}>Rechnung Nr.:{rechnungNr}</Text>
      </View>

      <View>
        <Text style={styles.textSM}>Sehr geehrter Kunde,</Text>
        <Text style={styles.textSM}>vielen Dank, fur Ihren Auftrag. Vereinbarungsgemäß berechnen wir Ihnen hiermit folgende Leistungen:</Text>
      </View>

      <View style={{marginTop:10}}>
        <View style={styles.tableHeader}>
          <Text style={{fontSize:12, color: '#000',}}>Position</Text>
          <Text style={{fontSize:12, color: '#000',}}>Bezeichnung</Text>
          <Text style={{fontSize:12, color: '#000',}}>Anzahl</Text>
          <Text style={{fontSize:12, color: '#000',}}>Einzelpreis</Text>
          <Text style={{fontSize:12, color: '#000',}}>Gesamtpreis</Text>
        </View>

        <View>
          {itemsList && itemsList.map((item) => {
            return (
              <View style={styles.item} key={item.id}>
                <Text style={[styles.textSM, {width: 60}]}>{item.id}.</Text>
                <Text style={[styles.textSM, {width: 250, textAlign: 'center'}]}>{item.name}</Text>
                <Text style={[styles.textSM, {width: 100, textAlign: 'center'}]}>{item.number}</Text>
                <Text style={[styles.textSM, {width: 220, textAlign: 'center'}]}>{item.price}€</Text>
                <Text style={[styles.textSM, {width: 150, textAlign: 'right'}]}>{Number(item.total).toFixed(2)}€</Text>
              </View>
            )
          }) 
          }
        </View>

        <View style={{justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1}}>
          <Text style={{fontSize:12}}>Nettopreis:</Text>
          <Text style={{fontSize:12}}>{Number(nettoPrice).toFixed(2)}€</Text>
        </View>

        <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
          <Text style={{fontSize:12}}>Zzgl 19% Ust.</Text>
          <Text style={{fontSize:12}}>{Number(tax).toFixed(2)}€</Text>
        </View>

        <View style={{justifyContent: 'space-between', flexDirection: 'row', borderTopColor: '#000', borderTopWidth: 2}}>
          <Text style={{fontSize: 12}}>Rechnungsbetrag</Text>
          <Text style={{fontSize: 12}}>{Number(toPay).toFixed(2)}€</Text>
        </View>
      </View>
      
      <View>
        <Text style={styles.textSM}>
          Bitte überweisen sie den Rechnungsbetrag innerhalb von 14 Tagen auf unser unten genanntes Konto.
        </Text>
        <Text style={styles.textSM}>
          Für weitere Fragen stehen Ihnen sehr gerne zur Verfügung.
        </Text>
        <Text style={styles.textSM}>
          Mit freundlichen Grüßen,
        </Text>
        <Text style={styles.textSM}>
          Bella Italia
        </Text>
      </View>

      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View>
          <Text style={{fontSize: 10, opacity: 0.9}}>Bella Italia</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>Siebenbürgerstr. 2d</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>85368, Moosburg an der Isar</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>bellaitaliaa@outlook.com</Text>
        </View>

        <View>
          <Text style={{fontSize: 10, opacity: 0.9}}>Sparkasse Mosburg</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>IBAN: DE36 7005 1003 0043 1818 64</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>BYLADEM1FSI</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>Sevdaim Bajrami</Text>
        </View>

        <View>
          <Text style={{fontSize: 10, opacity: 0.9}}>St.-Nr.: 115/202/41940</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>ID: DE273707814</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>Geschäftsführer: Sevdaim Bajrami</Text>
          <Text style={{fontSize: 10, opacity: 0.9}}>www.bellaitaliaa.com</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default RechnungPDF;
