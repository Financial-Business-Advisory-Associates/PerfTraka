import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedButton, ThemedInput, ThemedText, ThemedView } from '@/components/ui';
import { useThemeColor } from '@/components/Themed';
import { UiDefaults } from '@/constants/UiDefaults';
import Colors from '@/constants/Colors';

import { DashboardScreenProps } from '@/app/navigations/types-interfaces/dashboard';
import { IconThemedButton } from '@/components/ui/ThemedButton';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { TakeAttendanceErrorType, TakeAttendanceSchema, TakeAttendanceSchemaType } from '@/app/schema/dashboard.schema';
import PictureZone from '@/modules/CameraZone';
import { usePostAttendance } from '@/app/services/mutations';
import { convertDateFormat } from '@/constants/helpers';
import SecurityGuardSearch from '@/modules/SecurityGuardSearch';
import { useAppLocator } from '@/app/hooks/useAppLocator';


type SelectedGuard = {
  id: number;
  name: string;
}

const TakeAttendance = ({ navigation }: DashboardScreenProps<'TakeAttendance'>) => {
  const [guard, setGuard] = useState<SelectedGuard | null>(null);
  const [comment, setComment] = useState<string>("");
  const [status, setStatus] = useState<'check_in' | 'check_out'>("check_in");
  const [imageUrl, setImage] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lattitude: number | string; longitude: number | string; }>();
  const [errors, setErrors] = useState<TakeAttendanceErrorType>({});
  const textColor = useThemeColor({}, "black300");
  const { navigate } = navigation;

  const { location } = useAppLocator();

  const { mutate: postNewAttendance, isSuccess, data, error } = usePostAttendance();

  useEffect(() => {
    if (location) {
      const { coords } = location;
      setCoordinates({ lattitude: coords.latitude, longitude: coords.longitude })
    }
  }, [location])

  useEffect(() => {

    if (isSuccess && data?.status) {
      // handle success for offline 
      // navigate to success page
      setStatus('check_in');
      setImage('');
      setGuard(null);
      setComment('');
      navigate("Success", { activeScreen: "TakeAttendance", message: `${guard?.name} has successfully ${status.replace("_", " ")}`, data: { location: 'TakeAttendance' } })
    }

  }, [isSuccess])



  /**
  * used for form validation on blur and click events
  * @returns 
  */
  const validateForm = async (): Promise<null | TakeAttendanceSchemaType> => {
    try {
      const res = await TakeAttendanceSchema.validate({ security_guard_id: guard?.id, comment, status, avatar: imageUrl });
      return res;
    } catch (error) {
      // console.log(error);

      if (error instanceof Yup.ValidationError) {
        let msg = error.message.toLocaleLowerCase();
        if (msg.includes('comment')) {
          setErrors((prev) => ({ comment: msg }));
        }
        if (msg.includes('status')) {
          setErrors((prev) => ({ status: msg }));
        }
        if (msg.includes('security')) {
          setErrors((prev) => ({ security_guard_id: msg }));
        }
        if (msg.includes('picture')) {
          setErrors((prev) => ({ avatar: msg }));
        }
      }
    }
    return null;
  };


  /**
 * used to handle submission
 * @returns 
 */
  const handleSubmission = async () => {
    if (!coordinates) {
      Alert.alert("Location Error", "Sorry, We are unable to determine your location");
      return;
    }
    const validated = await validateForm();

    if (!validated) return null
    let fileName = `${guard?.name}-${guard?.id}`;
    let date = new Date();
    let currentDate = convertDateFormat(date, "YYYY-MM-DD");
    let currentDateTime = convertDateFormat(date, "YYYY-MM-DD HH:mm:ss");
    let currentTime = convertDateFormat(date, "HH:mm:ss");
    let longitude = coordinates?.longitude as string;
    let latitude = coordinates?.lattitude as string; //TODO: GET this f
    //submit form to apis


    const formData = new FormData();
    formData.append("image", {
      uri: imageUrl,
      name: `${fileName}.jpg`,
      type: 'image/jpeg',
    } as any);
    // formData.append("comment", comment);
    formData.append("action_type", status);
    formData.append("security_guard_id", validated.security_guard_id as string);
    formData.append("attendance_date", currentDate);
    formData.append("attendance_date_time", currentDateTime);
    formData.append("attendance_time", currentTime);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);


    // console.log(formData);
    // return;

    postNewAttendance(formData)
  }

  const handleImageCapture = (url: string) => {
    setImage(url)
  }

  const onSelectGuard = (value: SelectedGuard) => {
    setGuard(value)
  }



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} family='medium' size={24}>Attendance</ThemedText>
        <ThemedText style={[styles.subtitle, { color: textColor }]} family='regular' size={14}>
          Fill in the below Information to take attendance of security guard
        </ThemedText>

        <ThemedView transparent noPadding style={styles.formContainer}>

          <IconThemedButton
            title='Add Personnel'
            iconName='add' iconSize={24} iconStyle={{ color: Colors.light.secondary }}
            family='semi-bold' textStyle={styles.btnText} style={styles.btn}
            handleClick={() => navigate("AddGuard")} />

          <ThemedView transparent noPadding style={[styles.formContainer, { height: 60, marginBottom: 15 }]}>
            <SecurityGuardSearch error={errors.security_guard_id} label='Select Personnel' onSelectGuard={onSelectGuard} value={guard?.name} />
          </ThemedView>

          <ThemedView noPadding transparent style={styles.tabContainer}>

            <TouchableOpacity onPress={() => setStatus('check_in')} style={[styles.actionBtn, status == 'check_in' && styles.active]}>
              <MaterialIcons size={22} name='login' color={status == 'check_in' ? Colors.light.white : Colors.light.secondary} />
              <ThemedText family='semi-bold' style={[styles.actionText, status == 'check_in' && styles.active]} size={14}>Check in</ThemedText>
              {errors.status && <ThemedText size={12} style={{ color: 'red', paddingVertical: 2 }}>{errors.status}</ThemedText>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStatus('check_out')} style={[styles.actionBtn, status == 'check_out' && styles.active]}>
              <MaterialIcons size={22} name='logout' color={status == 'check_out' ? Colors.light.white : Colors.light.secondary} />
              <ThemedText family='semi-bold' style={[styles.actionText, status == 'check_out' && styles.active]} size={14}>Check out</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <ThemedView transparent noPadding style={[styles.formContainer]}>
            <ThemedInput
              error={errors.comment}
              noPadding
              name='comment' label='Comment'
              placeholder='Describe how your shift goes...'
              textAlignVertical="top"
              value={comment}
              onChangeText={(value) => setComment(value)}
              style={[styles.input, { height: 120, }]} multiline transparent />
          </ThemedView>

          <PictureZone
            error={errors.avatar}
            imageUrl={imageUrl}
            handleImageCapture={(url) => handleImageCapture(url)}
          />

          <ThemedButton
            containerStyle={styles.addButton}
            disabled={false}
            title='Submit'
            handleClick={handleSubmission}
          />
        </ThemedView>

      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: UiDefaults.viewPadding,
    backgroundColor: Colors.light.white,
    // justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light.mutedText
  },
  btnText: {
    color: Colors.light.secondary
  },
  tabContainer: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    height: 40,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 15
  },
  actionText: {
    color: Colors.light.secondary
  },
  actionBtn: {
    width: '50%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    borderColor: Colors.light.mutedText
  },
  active: {
    backgroundColor: Colors.light.secondary,
    color: Colors.light.white,
  },
  tabText: {
    lineHeight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  title: {
    lineHeight: 32,
  },
  subtitle: {
    lineHeight: 24,
  },
  formContainer: {
    marginTop: 15,
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: Colors.light.white,
  },
  pictureZone: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: 'rgba(230, 231, 230, 1)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  cameraButton: {
    alignItems: 'center',
    gap: 5,
  },
  addButton: {
    marginTop: 40,
  },

});

export default TakeAttendance;
