import React from 'react'

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import dayjs from 'dayjs'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    position: 'relative'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

export const Certificate = ({ fullName, certName }) => {
  return (

    <Document author='Trainistar' creator='Trainistar' language='en' title={`${certName} - ${fullName}`}>
      <Page size='A4' orientation='landscape' style={styles.page}>
        <View>
          <Image src='/images/cert-frame.jpg' style={{ width: '100%', height: '100%' }} />

          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, paddingTop: 24 }}>{fullName}</Text>
          </View>

          <View style={{ position: 'absolute', top: 120, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, marginTop: 8, marginBottom: 4 }}>has successfully completed</Text>
            <Text style={{ fontSize: 16 }}>{certName}</Text>
          </View>

          <View style={{ position: 'absolute', top: 462, left: 185, width: 160 }}>
            <Text style={{ textAlign: 'center', fontSize: 14 }}>{dayjs().format('ll')}</Text>
          </View>

          <View style={{ position: 'absolute', top: 458, left: 380, width: 160 }}>
            <Text style={{ textAlign: 'center' }}>Trainistar</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
